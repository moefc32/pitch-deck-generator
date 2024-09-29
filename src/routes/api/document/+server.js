import { VITE_APP_NAME } from '$env/static/private'
import { json } from '@sveltejs/kit';
import { Document, Packer, Paragraph } from 'docx';
import PptxGenJS from 'pptxgenjs';

async function createPptx(language, data) {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';

    data.forEach(item => {
        const slide = pptx.addSlide();

        if (item.body) {
            slide.addText(item.title, {
                lang: language,
                x: 1,
                y: 1,
                fontSize: 28,
                bold: true
            });

            slide.addText(item.body, {
                lang: language,
                x: 1,
                y: 2.25,
                fontSize: 18
            });
        } else {
            slide.addText(item.title, {
                lang: language,
                x: 1,
                y: 3,
                fontSize: 32,
                bold: true
            });
        }
    });

    const arrayBuffer = await pptx.write('arraybuffer');
    return {
        name: 'Presentation',
        arrayBuffer,
    };
};

async function createDocx(data) {
    const docx = new Document({
        creator: VITE_APP_NAME,
        title: 'Document',
        description: 'Pitch deck generated document',
        sections: [
            {
                children: [
                    new Paragraph({
                        heading: 'Heading1',
                        text: data[0].title,
                    }),
                    ...data.slice(1).map(item => {
                        const paragraphs = [new Paragraph({
                            heading: 'Heading2',
                            text: item.title,
                        })];

                        if (item.body) paragraphs.push(new Paragraph({
                            text: item.body,
                        }));

                        return paragraphs;
                    }).flat(),
                ],
            },
        ],
    });

    const arrayBuffer = await Packer.toBuffer(docx);
    return {
        name: 'Document',
        arrayBuffer,
    };
};

export async function POST({ request, url }) {
    const {
        language = '',
        data = [],
    } = await request.json() || {};
    const type = url.searchParams.get('type');

    if (!data.length) {
        return json({
            application: VITE_APP_NAME,
            message: 'No data provided!',
        }, {
            status: 400,
        });
    }

    const documentBuffer = (type === 'pptx')
        ? await createPptx(language, data)
        : await createDocx(data);

    const base64Data = Buffer.from(documentBuffer.arrayBuffer).toString('base64');

    return json({
        application: VITE_APP_NAME,
        message: `Generate file success.`,
        data: {
            name: documentBuffer.name,
            byte: base64Data,
        },
    });
}

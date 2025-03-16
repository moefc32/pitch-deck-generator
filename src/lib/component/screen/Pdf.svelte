<script>
    import { onMount } from 'svelte';
    import { jsPDF } from 'jspdf';
    import { X } from 'lucide-svelte';
    import gemini from '$lib/model/gemini';

    export let response;
    export let navigateBack;

    let pdfUrl = '';

    function renderBulletPoint(doc, lines, startX, startY, indent) {
        lines.forEach((line, index) => {
            if (index === 0) {
                doc.text('•', startX, startY);
                doc.text(line, startX + indent, startY);
            } else {
                doc.text(line, startX + indent, startY);
            }
        });
    }

    onMount(async () => {
        try {
            // Get AI-powered visual enhancements
            const enhanceResponse = await gemini.enhance(response.generated);
            console.log('AI Enhancement Response:', enhanceResponse);
            
            if (!enhanceResponse) {
                throw new Error('Failed to get AI enhancements');
            }
            
            const enhancements = enhanceResponse.enhancements;
            console.log('AI Enhancements:', enhancements);

            // Create PDF in landscape orientation
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'pt', // Use points for more precise positioning
                format: 'a4'
            });

            const margin = {
                left: 72,    // Increased left margin
                right: 72,   // Increased right margin
                top: 48,     // Adjusted top margin
                bottom: 48   // Adjusted bottom margin
            };
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            let yPos = margin.top + 40; // Start closer to top

            console.log('Generated slides:', response.generated);
            
            response.generated.forEach((slide, index) => {
                console.log(`Slide ${index}:`, slide);
                
                if (index > 0) {
                    doc.addPage();
                    yPos = margin.top + 40;
                }

                // Add slide number (except for title and closing slides)
                if (index > 0 && index < response.generated.length - 1) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`${index}/${response.generated.length - 2}`, pageWidth - margin.right, margin.top);
                }

                // Calculate content width for text wrapping
                const contentWidth = pageWidth - (margin.left + margin.right);

                // Get AI enhancements for current slide
                const enhancement = enhancements?.[index] || {
                    backgroundColor: '#ffffff',
                    fontSize: index === 0 ? 48 : 32,
                    emphasis: [],
                    layout: 'centered'
                };

                // Apply background color
                doc.setFillColor(enhancement.backgroundColor);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');

                // Handle different slide types
                if (index === 0) {
                    // Title slide - centered with AI-suggested font size
                    const titleText = slide.title || "Pitch Deck";
                    
                    // Main title
                    doc.setFontSize(enhancement.fontSize);
                    doc.setFont('helvetica', 'bold');
                    const titleLines = doc.splitTextToSize(titleText, contentWidth * 0.8);
                    
                    // Calculate total height including subtitle if present
                    const subtitleLines = slide.body ? doc.splitTextToSize(slide.body, contentWidth * 0.7) : [];
                    const subtitleHeight = subtitleLines.length * 24; // 24pt line height for subtitle
                    const totalHeight = (titleLines.length * (enhancement.fontSize + 12)) + (subtitleLines.length > 0 ? subtitleHeight + 40 : 0);
                    
                    // Start position for title
                    let titleY = (pageHeight - totalHeight) / 2;
                    
                    // Render title with emphasis
                    titleLines.forEach(line => {
                        const words = line.split(' ');
                        let currentX = 0;
                        const lineWidth = doc.getTextWidth(line);
                        const startX = (pageWidth - lineWidth) / 2;
                        
                        words.forEach((word, i) => {
                            if (enhancement.emphasis.includes(word.toLowerCase())) {
                                doc.setFont('helvetica', 'bold');
                            } else {
                                doc.setFont('helvetica', 'normal');
                            }
                            const wordWidth = doc.getTextWidth(word + ' ');
                            doc.text(word + (i < words.length - 1 ? ' ' : ''), startX + currentX, titleY);
                            currentX += wordWidth;
                        });
                        titleY += enhancement.fontSize + 12;
                    });
                    
                    // Render subtitle if present
                    if (slide.body) {
                        titleY += 40; // Space between title and subtitle
                        doc.setFontSize(24);
                        doc.setFont('helvetica', 'normal');
                        
                        subtitleLines.forEach(line => {
                            const lineWidth = doc.getTextWidth(line);
                            const subtitleX = (pageWidth - lineWidth) / 2;
                            doc.text(line, subtitleX, titleY);
                            titleY += 24;
                        });
                    }
                } else if (index === response.generated.length - 1) {
                    // Closing slide with enhanced styling
                    const titleText = slide.title || "Thank You";
                    
                    // Main title with AI-suggested size
                    doc.setFontSize(enhancement.fontSize);
                    doc.setFont('helvetica', 'bold');
                    const titleLines = doc.splitTextToSize(titleText, contentWidth * 0.8);
                    
                    // Calculate total height including contact info
                    const contactLines = slide.body ?
                        doc.splitTextToSize(slide.body, contentWidth * 0.7) :
                        ["Get in touch to learn more"];
                    const contactHeight = contactLines.length * 24;
                    const totalHeight = (titleLines.length * (enhancement.fontSize + 12)) + contactHeight + 40;
                    
                    // Center everything vertically
                    let currentY = (pageHeight - totalHeight) / 2;
                    
                    // Render title with emphasis
                    titleLines.forEach(line => {
                        const words = line.split(' ');
                        let currentX = 0;
                        const lineWidth = doc.getTextWidth(line);
                        const startX = (pageWidth - lineWidth) / 2;
                        
                        words.forEach((word, i) => {
                            if (enhancement.emphasis.includes(word.toLowerCase())) {
                                doc.setFont('helvetica', 'bold');
                            } else {
                                doc.setFont('helvetica', 'normal');
                            }
                            const wordWidth = doc.getTextWidth(word + ' ');
                            doc.text(word + (i < words.length - 1 ? ' ' : ''), startX + currentX, currentY);
                            currentX += wordWidth;
                        });
                        currentY += enhancement.fontSize + 12;
                    });
                    
                    // Contact section
                    currentY += 40;
                    doc.setFontSize(20);
                    doc.setFont('helvetica', 'normal');
                    
                    contactLines.forEach(line => {
                        const lineWidth = doc.getTextWidth(line);
                        const contactX = (pageWidth - lineWidth) / 2;
                        doc.text(line, contactX, currentY);
                        currentY += 24;
                    });
                } else {
                    // Content slides with AI-suggested layout and enhancements
                    doc.setFontSize(enhancement.fontSize);
                    doc.setFont('helvetica', 'bold');
                    const titleText = slide.title || "Content";
                    const titleLines = doc.splitTextToSize(titleText, contentWidth * 0.8);
                    
                    // Apply title with emphasis
                    titleLines.forEach(line => {
                        const words = line.split(' ');
                        let currentX = enhancement.layout === 'centered' ?
                            (pageWidth - doc.getTextWidth(line)) / 2 :
                            margin.left;
                        
                        words.forEach((word, i) => {
                            if (enhancement.emphasis.includes(word.toLowerCase())) {
                                doc.setFont('helvetica', 'bold');
                            } else {
                                doc.setFont('helvetica', 'normal');
                            }
                            doc.text(word + (i < words.length - 1 ? ' ' : ''), currentX, yPos);
                            currentX += doc.getTextWidth(word + ' ');
                        });
                        yPos += enhancement.fontSize + 12;
                    });
                    yPos += 20;

                    // Body content with layout variations
                    if (slide.body && slide.body.length > 0) {
                        doc.setFontSize(16);
                        doc.setFont('helvetica', 'normal');
                        
                        // Handle both bullet points and paragraph text
                        if (slide.body.includes('•')) {
                            const bulletPoints = slide.body
                                .split('\n')
                                .map(point => point.trim())
                                .filter(point => point.length > 0);
                            
                            // Adjust content width based on layout
                            const isDoubleColumn = enhancement.layout === 'two-column' && bulletPoints.length > 2;
                            const columnWidth = isDoubleColumn ?
                                (contentWidth - margin.left - 40) / 2 :
                                contentWidth - margin.left - margin.right;
                            const bulletIndent = 24;
                            
                            if (isDoubleColumn) {
                                // Split points into two columns
                                const midPoint = Math.ceil(bulletPoints.length / 2);
                                const leftPoints = bulletPoints.slice(0, midPoint);
                                const rightPoints = bulletPoints.slice(midPoint);
                                const startY = yPos + 20; // Add some space after title
                                
                                // Left column
                                leftPoints.forEach(bullet => {
                                    const cleanBullet = bullet.replace(/^[•\-]\s*/, '').trim();
                                    const lines = doc.splitTextToSize(cleanBullet, columnWidth - bulletIndent);
                                    
                                    if (yPos > pageHeight - margin.bottom) {
                                        doc.addPage();
                                        yPos = margin.top + 40;
                                        doc.setFillColor(enhancement.backgroundColor);
                                        doc.rect(0, 0, pageWidth, pageHeight, 'F');
                                    }
                                    
                                    renderBulletPoint(doc, lines, margin.left, yPos, bulletIndent);
                                    yPos += (lines.length * 24) + 12; // Reduced spacing
                                });
                                
                                // Reset Y for right column
                                yPos = startY;
                                const rightX = margin.left + columnWidth + 40;
                                
                                // Right column
                                rightPoints.forEach(bullet => {
                                    const cleanBullet = bullet.replace(/^[•\-]\s*/, '').trim();
                                    const lines = doc.splitTextToSize(cleanBullet, columnWidth - bulletIndent);
                                    
                                    if (yPos > pageHeight - margin.bottom) {
                                        doc.addPage();
                                        yPos = margin.top + 40;
                                        doc.setFillColor(enhancement.backgroundColor);
                                        doc.rect(0, 0, pageWidth, pageHeight, 'F');
                                    }
                                    
                                    renderBulletPoint(doc, lines, rightX, yPos, bulletIndent);
                                    yPos += (lines.length * 24) + 12; // Reduced spacing
                                });
                            } else {
                                // Single column layout
                                yPos += 20; // Add some space after title
                                bulletPoints.forEach(bullet => {
                                    const cleanBullet = bullet.replace(/^[•\-]\s*/, '').trim();
                                    const lines = doc.splitTextToSize(cleanBullet, columnWidth);
                                    
                                    if (yPos > pageHeight - margin.bottom) {
                                        doc.addPage();
                                        yPos = margin.top + 40;
                                        doc.setFillColor(enhancement.backgroundColor);
                                        doc.rect(0, 0, pageWidth, pageHeight, 'F');
                                    }
                                    
                                    renderBulletPoint(doc, lines, margin.left, yPos, bulletIndent);
                                    yPos += (lines.length * 24) + 12; // Reduced spacing
                                });
                            }
                        } else {
                            // Regular paragraph text
                            yPos += 20; // Add some space after title
                            const paragraphLines = doc.splitTextToSize(slide.body, contentWidth - margin.left - margin.right);
                            
                            paragraphLines.forEach(line => {
                                if (yPos > pageHeight - margin.bottom) {
                                    doc.addPage();
                                    yPos = margin.top + 40;
                                    doc.setFillColor(enhancement.backgroundColor);
                                    doc.rect(0, 0, pageWidth, pageHeight, 'F');
                                }
                                
                                doc.text(line, margin.left, yPos);
                                yPos += 24; // Standard line spacing
                            });
                        }
                    }
                }
            });

            pdfUrl = doc.output('datauristring');
        } catch (error) {
            console.error('Error generating enhanced PDF:', error);
            // Create basic PDF without enhancements as fallback
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'pt',
                format: 'a4'
            });
            
            response.generated.forEach((slide, index) => {
                if (index > 0) doc.addPage();
                doc.setFontSize(32);
                doc.text(slide.title || '', 72, 72);
                if (slide.body) {
                    doc.setFontSize(16);
                    const lines = doc.splitTextToSize(slide.body, doc.internal.pageSize.width - 144);
                    doc.text(lines, 72, 120);
                }
            });
            
            pdfUrl = doc.output('datauristring');
        }
    });

    function downloadPdf() {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'pitch-deck.pdf';
        link.click();
    }
</script>

<div class="flex flex-1 flex-col justify-center items-center self-stretch">
    <div class="w-full max-w-[1200px] flex flex-col items-center">
        <div class="flex items-center justify-between w-full mb-6">
            <button
                type="button"
                class="btn preset-filled-secondary-500"
                on:click={navigateBack}
            >
                <X size={24} />
                Back
            </button>
            <button
                type="button"
                class="btn preset-filled-primary-500"
                on:click={downloadPdf}
            >
                Download PDF
            </button>
        </div>

        {#if pdfUrl}
            <iframe
                title="PDF Preview"
                src={pdfUrl}
                class="w-full h-[600px] border border-gray-200 rounded-lg"
            ></iframe>
        {:else}
            <div class="flex items-center justify-center w-full h-[600px] border border-gray-200 rounded-lg">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        {/if}
    </div>
</div>
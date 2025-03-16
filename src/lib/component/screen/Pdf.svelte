<script>
    import { onMount } from 'svelte';
    import { jsPDF } from 'jspdf';
    import { X } from 'lucide-svelte';

    export let response;
    export let navigateBack;

    let pdfUrl = '';

    onMount(async () => {
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

            // Ensure slide has title
            if (!slide.title) {
                slide.title = index === 0 ? "Pitch Deck" :
                             index === response.generated.length - 1 ? "Thank You" :
                             "Content";
            }

            // Calculate content width for text wrapping
            const contentWidth = pageWidth - (margin.left + margin.right);

            // Handle different slide types
            if (index === 0) {
                // Title slide - centered with larger font
                doc.setFontSize(48);
                doc.setFont('helvetica', 'normal');
                const titleLines = doc.splitTextToSize(slide.title, contentWidth * 0.8);
                const totalHeight = titleLines.length * 60;
                let titleY = (pageHeight - totalHeight) / 2;
                
                titleLines.forEach(line => {
                    const lineWidth = doc.getTextWidth(line);
                    const titleX = (pageWidth - lineWidth) / 2;
                    doc.text(line, titleX, titleY);
                    titleY += 60;
                });
            } else if (index === response.generated.length - 1) {
                // Closing slide - centered with contact info
                doc.setFontSize(32);
                doc.setFont('helvetica', 'normal');
                const titleLines = doc.splitTextToSize(slide.title, contentWidth * 0.8);
                
                titleLines.forEach(line => {
                    const lineWidth = doc.getTextWidth(line);
                    const titleX = (pageWidth - lineWidth) / 2;
                    doc.text(line, titleX, yPos);
                    yPos += 40;
                });
                
                yPos += 20;
                doc.setFontSize(16);
                const contactText = "Get in touch to learn more";
                const contactWidth = doc.getTextWidth(contactText);
                const contactX = (pageWidth - contactWidth) / 2;
                doc.text(contactText, contactX, yPos);
            } else {
                // Content slides - left-aligned with bullets
                doc.setFontSize(32);
                doc.setFont('helvetica', 'normal');
                const titleLines = doc.splitTextToSize(slide.title, contentWidth * 0.8);
                
                titleLines.forEach(line => {
                    doc.text(line, margin.left, yPos);
                    yPos += 40;
                });
                yPos += 20;

                // Ensure slide has body content
                if (!slide.body) {
                    slide.body = "• Content to be added\n• Additional information will be provided";
                }

                    // Body content
                    if (slide.body && slide.body.length > 0) {
                        doc.setFontSize(16);
                        doc.setFont('helvetica', 'normal');
                        
                        // Convert string of bullet points to array and clean up
                        const bulletPoints = slide.body
                            .split('\n')
                            .map(point => point.trim())
                            .filter(point => point.length > 0);
                        
                        // Calculate content width for landscape format
                        const contentWidth = pageWidth - (margin.left + margin.right + 100); // Extra space for bullets
                        const bulletIndent = 24; // Space for bullet point
                        
                        bulletPoints.forEach(bullet => {
                            // Remove existing bullet point if present and trim
                            const cleanBullet = bullet.replace(/^[•\-]\s*/, '').trim();
                            const lines = doc.splitTextToSize(cleanBullet, contentWidth);
                            
                            lines.forEach((line, index) => {
                                if (yPos > pageHeight - margin.bottom) {
                                    doc.addPage();
                                    yPos = margin.top + 40;
                                }
                                
                                if (index === 0) {
                                    // First line with bullet point
                                    doc.text('•', margin.left, yPos);
                                    doc.text(line, margin.left + bulletIndent, yPos);
                                } else {
                                    // Continuation lines align with text, not bullet
                                    doc.text(line, margin.left + bulletIndent, yPos);
                                }
                                
                                yPos += 28; // Reduced line spacing
                            });
                            
                            yPos += 16; // Reduced space between bullet points
                        });
                    }
                }
            });

        pdfUrl = doc.output('datauristring');
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
interface SendPdfResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Placeholder function for sending PDFs via Resend
 * TODO: Implement actual Resend email sending logic
 * This should send the requested PDF as an attachment to the user's email
 */
export async function sendPdfViaResend(
  email: string,
  pdfType: "natal_chart" | "checklist" | "guide",
  name: string
): Promise<SendPdfResult> {
  try {
    console.log(`Enqueueing PDF send: ${pdfType} to ${email} (${name})`);

    // TODO: Implement actual Resend API call
    // const response = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     from: "noreply@lianaastro.ru",
    //     to: email,
    //     subject: getPdfSubject(pdfType),
    //     html: getPdfEmailTemplate(pdfType, name),
    //     attachments: [
    //       {
    //         filename: getPdfFilename(pdfType),
    //         path: getPdfPath(pdfType)
    //       }
    //     ]
    //   })
    // });

    // For now, just return success
    return {
      success: true,
      messageId: `pdf-${Date.now()}`
    };
  } catch (error) {
    console.error(`Error enqueueing PDF send for ${pdfType}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

function getPdfSubject(pdfType: "natal_chart" | "checklist" | "guide"): string {
  const subjects = {
    natal_chart: "Your Natal Chart Analysis - Liana Astro",
    checklist: "Life Planning Checklist - Liana Astro",
    guide: "Astrology Guide for Beginners - Liana Astro"
  };
  return subjects[pdfType];
}

function getPdfFilename(pdfType: "natal_chart" | "checklist" | "guide"): string {
  const filenames = {
    natal_chart: "natal-chart.pdf",
    checklist: "checklist.pdf",
    guide: "guide.pdf"
  };
  return filenames[pdfType];
}

function getPdfPath(pdfType: "natal_chart" | "checklist" | "guide"): string {
  const paths = {
    natal_chart: "/public/assets/natal-chart.pdf",
    checklist: "/public/assets/checklist.pdf",
    guide: "/public/assets/guide.pdf"
  };
  return paths[pdfType];
}

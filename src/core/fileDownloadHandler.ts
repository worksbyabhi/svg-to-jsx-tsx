export {};

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

export const fileDownloadHandler = (jsxData: string, fileName: string) => {
  if (navigator.msSaveBlob) {
    const blob = new Blob([jsxData], {
      type: "data:text/plain;charset=utf-8",
    });
    navigator.msSaveBlob(blob, fileName);
  } else {
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute("target", "_blank");
    downloadElement.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsxData)
    );
    downloadElement.setAttribute("download", fileName);
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  }
};

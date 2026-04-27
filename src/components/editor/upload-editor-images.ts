export interface UploadedEditorImage {
  url: string;
  name: string;
}

export async function uploadEditorImages(
  files: File[]
): Promise<UploadedEditorImage[]> {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'));

  if (!imageFiles.length) {
    return [];
  }

  const formData = new FormData();
  imageFiles.forEach((file) => formData.append('files', file));

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await getUploadError(response));
  }

  const data = (await response.json()) as { urls?: unknown };

  if (!Array.isArray(data.urls)) {
    throw new Error('Upload did not return image URLs.');
  }

  return data.urls
    .filter((url): url is string => typeof url === 'string')
    .map((url, index) => ({
      url,
      name: imageFiles[index]?.name ?? 'Image',
    }));
}

async function getUploadError(response: Response) {
  try {
    const data = (await response.json()) as { error?: unknown };
    if (typeof data.error === 'string') {
      return data.error;
    }
  } catch {
    // Fall through to the generic message below.
  }

  return 'Image upload failed.';
}

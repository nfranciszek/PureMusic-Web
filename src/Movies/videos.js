
import { storage, ref, getDownloadURL } from "../Utilities/firebase";

export const fetchVideoUrl = async (filePath) => {
  try {
    const videoRef = ref(storage, filePath); // Example: "videos/myVideo.mp4"
    const url = await getDownloadURL(videoRef);
    return url;
  } catch (error) {
    console.error("Error fetching video URL:", error);

  }
}

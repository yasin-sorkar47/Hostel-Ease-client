import axios from "axios";

const imgbb_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_API_KEY
}`;

export default async function imageUpload(image) {
  const imageFile = { image: image[0] };
  const result = await axios.post(imgbb_api, imageFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
}

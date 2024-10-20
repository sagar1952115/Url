import axios from "axios";
import React, { useRef, useState } from "react";

const HomePage = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const [shortenUrl,setShortenUrl]=useState("")
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Reset success message after 2 seconds
    }).catch(() => {
      setCopySuccess('Failed to copy');
    });
  };


  const handleInput = (e) => {
    const textarea = textareaRef.current;
    setContent(e.target.value);

    // Reset height to auto to get scroll height
    textarea.style.height = "auto";

    // Max height based on 10 lines (you can adjust this value)
    const maxHeight = 40 * 5; // assuming 1 line = 40px height

    // Set height dynamically or restrict to max height
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

    // Set overflow when max height is reached
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "scroll" : "hidden";
  };

  const handleShortenUrl=async()=>{
    try{
      const response=await axios.post("http://localhost:5000/shorten",{
        longUrl:content,
      })

      console.log(response)
      setShortenUrl(response?.data?.shortUrl)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="">
      <div className="mx-auto font-bold w-max text-4xl my-5">Url Shortner</div>
      <div className="p-5 gap-5 flex items-center  flex-col justify-center">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          placeholder="Type something..."
          className="w-full p-2 text-base border border-gray-300 rounded-md resize-none overflow-hidden  outline-none focus:border-blue-500"
          rows="1"
          style={{ minHeight: "40px", maxHeight: "400px" }} // 10 lines with a line height of 40px
        />
        <button onClick={handleShortenUrl} className="px-4 p-1 border rounded-md text-white bg-blue-500 hover:bg-blue-600 font-medium">Create</button>
      </div>
      {
        shortenUrl && <div className="mt-4 m-5 p-4 bg-gray-100 flex justify-between items-center rounded-lg shadow-md">
        <div className="text-lg text-gray-800">{shortenUrl}</div>
        <div className="mt-2 relative flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Copy URL
          </button>
          {copySuccess && <span className="absolute -left-16 text-green-500 text-sm">{copySuccess}</span>}
        </div>
      </div>
      }
    </div>
  );
};

export default HomePage;

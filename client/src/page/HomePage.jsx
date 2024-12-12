import axios from "axios";
import React, { useRef, useState } from "react";

const HomePage = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const [shortenUrl, setShortenUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortenUrl)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset success message after 2 seconds
      })
      .catch(() => {
        setCopySuccess("Failed to copy");
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

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/shorten`, {
        longUrl: content,
      });

      console.log(response);
      setShortenUrl(response?.data?.shortUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl  w-full p-5 mx-auto ">
      <div className="lg:p-5 py-5 lg:py-0 w-full gap-5 flex  justify-center">
        <div className="flex w-full border-white border border-opacity-[37%] rounded-md p-2 items-center bg-[#1C1E20]">
          <img src="/assets/link.svg" className="px-2" alt="" />
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleInput}
            placeholder="Enter your link here..."
            className="w-full text-nowrap bg-transparent p-2 text-base   resize-none overflow-hidden  outline-none text-[#454545] placeholder:text-[#454545]"
            rows="1"
            style={{ minHeight: "40px", maxHeight: "400px" }} // 10 lines with a line height of 40px
          />
        </div>

        <div
          onClick={handleShortenUrl}
          className="border-white cursor-pointer aspect-square px-4  border border-opacity-[37%] flex-grow flex h-auto rounded-lg p-2 bg-[#1C1E20]"
        >
          <img src="/assets/go.svg" className="" alt="" />
        </div>
      </div>
      {shortenUrl && (
        <div className="lg:p-5">
          <div className="flex gap-5">
            <div className="flex flex-1 border-white text-[#454545] border border-opacity-[37%] rounded-md p-4 items-center bg-[#1C1E20]">
              {shortenUrl}
            </div>
            <div className="flex relative">
              <div
                onClick={handleCopy}
                className="border-white flex justify-center items-center gap-2 text-white text-lg font-medium cursor-pointer px-4 border border-opacity-[37%] rounded-lg p-2 bg-[#1C1E20]"
              >
                <img src="/assets/copy.svg" className="" alt="" />
                <div>Copy</div>
              </div>
              {copySuccess && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-300 font-medium">
                  {copySuccess}
                </span>
              )}
            </div>

            {/* <div className="mt-2 relative flex items-center space-x-2">
              <div
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Copy
              </div>
              {copySuccess && (
                <span className="absolute -left-16 text-green-500 text-sm">
                  {copySuccess}
                </span>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

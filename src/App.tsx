import { useRef, useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import pop_1 from "./sounds/pop_1.wav";
import pop_2 from "./sounds/pop_2.wav";
import pop_3 from "./sounds/pop_3.wav";

function Egg({ datestamp }: { datestamp: number }) {
  return (
    <g id="Egg">
      <path
        id="fill"
        d="M29 21.8947C29 31.3417 22.5081 39 14.5 39C6.49187 39 0 31.3417 0 21.8947C0 12.4478 6.49187 0 14.5 0C22.5081 0 29 12.4478 29 21.8947Z"
        fill={`#${Math.floor(Math.abs(Math.sin(datestamp) * 16777215)).toString(
          16
        )}`}
      />
      <path
        id="decoration"
        d="M4.5 19L7 11L8.7 19L10.75 11L12.4 19L14.5 11L16.1 19L18.25 11L19.8 19L22 11L24.5 19"
        stroke={`#${Math.floor(
          Math.abs(Math.cos(datestamp) * 16777215)
        ).toString(16)}`}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="egg"
        d="M27 21.8947C27 30.5597 21.1065 37 14.5 37C7.89351 37 2 30.5597 2 21.8947C2 17.5709 3.50422 12.4547 5.95341 8.44783C8.45925 4.3483 11.56 2 14.5 2C17.44 2 20.5408 4.3483 23.0466 8.44783C25.4958 12.4547 27 17.5709 27 21.8947Z"
        stroke="black"
        strokeWidth="5"
        fill="none"
      />
    </g>
  );
}

function Chicken() {
  const [eggs, setEggs] = useState<number[]>([]);
  const prevent = useRef(false);

  const pops = [useSound(pop_1), useSound(pop_2), useSound(pop_3)];
  const layEgg = () => {
    setEggs((eggs) => [...eggs, Date.now()]);
    const popChoice = Math.floor(Math.random() * 3);
    console.log(popChoice);
    pops[popChoice][0](); // play the sound
  };

  return (
    <>
      <div className="chickenwrapper">
        <div className="eggbox">
          {eggs.map((datestamp) => (
            <AnimatePresence key={datestamp}>
              <motion.svg
                className="egg"
                width="33"
                height="40"
                viewBox="-1 0 31 39"
                initial={{
                  bottom: "100%",
                  opacity: 1,
                }}
                animate={{
                  bottom: "0%",
                  opacity: 0,
                  x: datestamp % 2 === 0 ? datestamp % 60 : -(datestamp % 60),

                  rotate:
                    datestamp % 2 === 0 ? datestamp % 360 : -(datestamp % 360),
                  transition: {
                    duration: 2,
                    ease: "linear",
                    opacity: { duration: 2, delay: 4, ease: "easeIn" },
                  },
                }}
                onAnimationComplete={() => {
                  setEggs((eggs) => eggs.filter((e) => e !== datestamp));
                }}
              >
                <Egg datestamp={datestamp} />
              </motion.svg>
            </AnimatePresence>
          ))}
        </div>
        <svg
          className="chickenbox"
          width="100%"
          viewBox="-5 -10 160 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            whileHover="hovered"
            whileTap="clicked"
            onMouseDown={() => {
              prevent.current = true;
              layEgg();
            }}
            onTouchStart={() => {
              if (!prevent.current) {
                layEgg();
              } else {
                prevent.current = false;
              }
            }}
            variants={{
              hovered: {
                transition: {
                  duration: 0.2,
                },

                scaleY: 1.1,
              },
              clicked: {
                scaleY: 0.8,
                transition: {
                  duration: 0.2,
                },
              },
            }}
            id="chicken"
          >
            <motion.path
              id="hat"
              d="M36.1068 29.5946C36.3906 30.3412 37.0139 30.9073 37.7843 31.1179L72.5418 40.6231C73.1772 40.7969 73.8555 40.7128 74.4293 40.3892C80.2945 37.0817 83.9135 33.3479 85.6423 29.5373C87.397 25.67 87.1211 21.8773 85.4628 18.8751C83.0708 14.5444 77.8478 12.0768 72.8359 13.4227C72.7578 11.5037 72.1897 9.77819 71.1613 8.30571C69.2712 5.59974 66.1688 4.24805 63.1155 3.92091C58.8936 3.46855 53.7409 4.9674 50.7923 8.73848C47.8536 5.32912 43.2158 3.95398 39.2051 5.82367C36.3068 7.17478 34.2676 10.0448 33.6226 14.0667C32.9872 18.0289 33.6697 23.1814 36.1068 29.5946Z"
              fill="#FF0000"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                y: -4,
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
            <path
              id="body"
              d="M112.427 49.5809C112.373 49.5628 112.319 49.5465 112.264 49.5321C108.047 48.4202 104.265 48.5506 101.718 50.6084C99.03 52.7801 98.6916 56.2503 99.5004 59.4854C100.242 62.4518 99.6323 64.3757 98.6441 65.6262C97.5911 66.9589 95.8248 67.8805 93.7063 68.2115C91.5897 68.5422 89.3968 68.2342 87.743 67.4256C86.1216 66.6328 85.1988 65.4758 84.9978 64.0692C83.6565 54.6807 81.8842 43.8311 77.2889 35.5103C74.9624 31.2976 71.8591 27.6263 67.6325 25.1183C63.3903 22.6011 58.198 21.3643 51.8861 21.7356C43.0306 22.2565 36.8005 24.641 32.4943 28.6053C28.2003 32.5584 26.1452 37.7853 25.0317 43.3129C24.1216 47.8303 23.8007 52.7949 23.4863 57.6583C23.4199 58.6845 23.3539 59.7061 23.2827 60.718C22.8658 66.6418 22.2704 72.3507 20.557 77.4913C20.3065 78.2427 20.0013 79.0929 19.6636 80.0336C16.4041 89.114 10.1154 106.633 20.7581 125.257C23.8995 130.755 29.635 134.941 36.4906 137.975C43.3831 141.026 51.6547 143.025 60.2399 143.998C77.3257 145.936 96.2524 143.871 108.639 137.314C123.366 129.517 134.459 111.203 136.962 93.275C138.222 84.253 137.343 75.111 133.473 67.2909C129.574 59.4132 122.724 53.0579 112.427 49.5809Z"
              fill="white"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              initial={{
                scaleY: 1,
              }}
              variants={{
                clicked: {
                  scaleY: 0.5,
                },
              }}
              id="wing"
              d="M62.4537 98.637C56.2245 136.874 116.288 135.056 104.449 98.637"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="beak"
              d="M15.6634 57.3877C15.1573 57.8429 14.8588 58.4849 14.8367 59.1653C14.8146 59.8457 15.071 60.5056 15.5465 60.9927C16.7415 62.2167 18.4821 63.3354 20.3115 64.1814C22.1571 65.0349 24.2954 65.7047 26.3682 65.8853C28.3885 66.0612 30.7467 65.8001 32.5691 64.2929C34.5025 62.6939 35.2283 60.2127 34.9918 57.2978C34.7653 54.5071 33.779 52.1101 31.5266 50.9556C29.4362 49.8842 27.0977 50.3521 25.3193 51.0095C21.6703 52.3584 17.7765 55.4869 15.6634 57.3877Z"
              fill="#BDFF00"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.g
              initial={{
                scaleX: 1,
                scaleY: 1,
              }}
              variants={{
                hovered: {
                  scaleY: 1.1,
                },
                clicked: {
                  scaleX: 2,
                  scaleY: 0.5,
                },
              }}
              transition={{ duration: 0.1 }}
            >
              <ellipse
                id="eye"
                cx="48.1569"
                cy="50.1807"
                rx="4.15774"
                ry="5.54365"
                fill="black"
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>
      <div className="footer">
        <p>
          Made{" "}
          <a target="_blank" href="https://github.com/Swendude/chicken">
            open-source
          </a>{" "}
          with ❤️ by{" "}
          <a target="_blank" href="https://www.mindmingle.nl">
            Mind Mingle
          </a>
          , learn to code in ten weeks!
        </p>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Chicken />
    </>
  );
}

export default App;

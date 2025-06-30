import { useEffect, useState } from "react";
import mesjid from "./assets/mesjidd.png";

function App() {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("padang");
  const [data, setData] = useState({});
  const prayerTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  // console.log(input);
  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${term}`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, [term]);
  return (
    <>
      <div
        className={`h-screen flex flex-col items-center gap-12 bg-[url('./assets/mesji.jpg')] bg-position-[center_top] bg-no-repeat bg-cover text-white`}
      >
        <div className="w-full flex justify-between px-2 py-2 lg:px-8 text-lg font-medium">
          <span className="">
            {data.date && data.date.gregorian.weekday.en} <br />{" "}
            {data.date && data.date.readable}
          </span>
          <span className="capitalize">{term}</span>
        </div>
        <div className="w-full text-center flex justify-center">
          <form
            action=""
            className="w-full px-2 md:max-w-[700px]"
            onSubmit={(e) => {
              e.preventDefault();
              setTerm(input);
              setInput("");
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search Prayer Time by City..."
              className="outline-none h-[45px] w-full px-4 py-2 border-2 border-white rounded-full text-black text-lg bg-slate-50 focus:ring-2 focus:ring-green-400 shadow-2xl"
            />
            <input type="submit" value="" className="display-none" />
          </form>
        </div>
        <div className="w-full px-4">
          <div className="bg-slate-100/30 backdrop-blur-xs backdrop-grayscale rounded-3xl shadow-xl px-4 py-4 text-xl md:max-w-[700px] md:mx-auto">
            {data &&
              prayerTimes.map((p, index) => {
                return (
                  <div
                    className="flex justify-between py-3 text-black"
                    key={index}
                  >
                    <span className="font-semibold">{p}</span>
                    <span className="font-semibold">
                      {data.timings && data.timings[`${p}`]}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="px-2 text-lg text-center text-black">
          <div className="">
            ...dan dirikanlah sholat, tunaikan zakat <br />
            <span className="text-black font-semibold text-xl inline-block mt-4 lg:inline">
              Al-Baqarah 2:43
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

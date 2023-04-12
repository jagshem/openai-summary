import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [summaries, setSummaries] = useState([]);

  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/generate-summuary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setSummaries([
          ...summaries,
          {
            key: `summary-${summaries.length}`,
            name: `Özet ${summaries.length + 1}`,
            summary: res.summary,
            originalText: query,
          },
        ]);
      })
      .catch((err) => console.log(err));
    setQuery("");
  };

  return (
    <div className="container mx-auto my-6">
      <header className="border-b pb-6 mb-6 flex items-center justify-between">
        <div>
          <h6 className="flex items-center gap-x-2 text-xl font-bold">
            SUMMARY
            <span className="bg-yellow-500 rounded-md px-4 py-1 text-black">
              HUB
            </span>
          </h6>
          <p className="text-base font-medium text-zinc-600 mt-2">
            Girdiğiniz metni özetleyen güzel bir araç!
          </p>
        </div>
      </header>
      <form
        onSubmit={submitHandle}
        className="flex gap-x-4 items-center justify-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Metni buraya yazınız..."
          className="h-10 w-[400px] bg-zinc-100 outline-none focus:bg-zinc-300 px-4 rounded-md text-[15px] font-medium"
        />
        <button
          disabled={!query || loading}
          className="h-10 px-5 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 disabled:bg-zinc-100 disabled:text-zinc-600 disabled:cursor-not-allowed"
        >
          {loading ? "ÖZETLENİYOR..." : "ÖZETLE"}
        </button>
      </form>
      {summaries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Özetler</h3>
          {summaries.map((item) => (
            <div className="flex mb-3" key={item.key}>
              <div className="w-1/2 p-4 bg-zinc-100 rounded-md mr-3">
                <h4 className="text-lg font-bold mb-3">{item.name}</h4>
                <p>{item.summary}</p>
              </div>
              <div className="w-1/2 p-4 bg-zinc-100 rounded-md ml-3">
                <h4 className="text-lg font-bold mb-3">GİRDİĞİNİZ METİN</h4>
                <p>{item.originalText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
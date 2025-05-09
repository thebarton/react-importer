import 'tippy.js/dist/tippy.css'; // optional for styling
import rainbow from '../assets/images/rainbow.jpg';
import logo from '../assets/images/logo-white.png';
import demo from '../assets/images/demo.mp4';

export default function Header() {
  return (
    <div
      className="bg-cover bg-center text-white clip-diagonal"
      style={{
        backgroundImage: `url(${rainbow})`,
      }}
    >
      <div className="relative bg-gradient-to-b from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0)] py-4 font-semibold text-white">
        <div className="mx-auto mt-4 flex max-w-6xl flex-row justify-between px-4">
          <div className="rubik flex flex-row items-center gap-2">
            <img src={logo} className="w-8" />
            <span class="text-lg">
              <span class="font-thin">Hello</span><span className="ml-[1px] font-semibold">CSV</span>
            </span>
          </div>
          <iframe 
            src="https://ghbtns.com/github-btn.html?user=HelloCSV&repo=HelloCSV&type=star&count=true"
            scrolling="0"
            width="100"
            height="30"
            title="GitHub">
          </iframe>
        </div>
      </div>
      <div className="ml-auto mr-0 flex max-w-none flex-col px-4 pt-24 pb-32 lg:!flex-row" style={{ marginLeft: 'max(16px, calc((100% - 72rem) / 2))' }}>
        <div>
          <div className="rubik mb-6 text-5xl font-bold tracking-tighter sm:text-7xl">
            A Sleek CSV Importer
          </div>
          <div className="mb-6 text-lg/9">
            ✓ Finally, a CSV importer that just works.
            <br />
            ✓ No more custom scripts to handle complex CSV files.
            <br />
            {`✓ Drop it into any app, even if you don't use React.`}
            <br />
            ✓ Beautiful, customizable UI, with sensible defaults.
            <br />
            ✓ Fully supports multiple languages for a seamless experience.
            <br />✓ Only ~130KB gzipped.
          </div>

          <div className="flex">
            {/* TODO: Once we get the modal working, we will have this open the importer in a modal */}
            <a
              type="button"
              href="#basic-example"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#basic-example')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-md mr-3 cursor-pointer rounded-full px-4 py-2.5 font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:opacity-80"
            >
              Demo ❯
            </a>
            <a
              className="text-md px-4 py-2.5"
              href="https://github.com/HelloCSV/HelloCSV"
              target="_blank"
              rel="noreferrer"
            >
              Documentation ❯
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] lg:mt-0">
          <video className="w-[800px] rounded-lg" src={demo} autoPlay muted loop controls />
        </div>
      </div>
    </div>
  );
}

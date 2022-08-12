import Vercel from './components/Vercel';

// eslint-disable-next-line import/no-default-export
export default {
  projectLink: 'https://github.com/aidenybai/million',
  projectChatLink: 'https://discord.gg/X9yFbcV2rF',
  docsRepositoryBase:
    'https://github.com/aidenybai/million/blob/main/website/pages',
  titleSuffix: ' – Million',
  feedbackLink: () => {
    return 'Question? Give us feedback →';
  },
  feedbackLabels: 'feedback',
  nextLinks: true,
  prevLinks: true,
  search: true,
  unstable_flexsearch: {
    codeblocks: true,
  },
  darkMode: true,
  footerText: () => {
    return (
      <>
        <p>
          <script
            async
            type="text/javascript"
            src="//cdn.carbonads.com/carbon.js?serve=CEAI427W&placement=millionjsorg"
            id="_carbonads_js"
          ></script>
        </p>
        <p>
          <a
            rel="noopener"
            className="w-full inline-flex items-center no-underline text-current font-semibold grayscale"
            href="https://vercel.com/?utm_source=millionjs&utm_campaign=oss"
            target="_blank"
          >
            <span className="mr-1">Powered By</span>
            <span>
              <Vercel />
            </span>
          </a>
        </p>
        <p>
          <small>
            Million is{' '}
            <a
              href="https://github.com/aidenybai/million/blob/main/LICENSE"
              target="_blank"
            >
              MIT-licensed
            </a>{' '}
            open-source software and{' '}
            <a href="https://arxiv.org/abs/2202.08409" target="_blank">
              research project
            </a>{' '}
            by{' '}
            <a href="https://aidenybai.com" target="_blank">
              Aiden Bai
            </a>
          </small>
        </p>
      </>
    );
  },
  head() {
    const meta = {
      title: 'Million',
      description: `🦁 <1kb compiler-augmented virtual DOM. It's fast!`,
      image: 'https://millionjs.org/icon.png',
    };
    return (
      <>
        {/* Favicons, meta */}
        <link rel="apple-touch-icon" href={meta.image} />
        <link rel="icon" type="image/png" href={meta.image} />
        <link rel="mask-icon" href={meta.image} color="#000000" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="icon" type="image/png" href={meta.image} />
      </>
    );
  },
  footerEditOnGitHubLink: true, // will link to the docs repo
  floatTOC: true,
  bannerKey: 'mil',
  banner: function Banner() {
    return (
      <a
        href="https://github.com/aidenybai/million"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-current no-underline"
        title="Go to the Million GitHub"
      >
        Leave a 🌟 on GitHub →
      </a>
    );
  },
  logo: () => {
    return (
      <>
        <svg
          className="md:inline object-contain hidden"
          style={{ height: '2em' }}
          width="2em"
          height="2em"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.4296 140.455C62.4806 128.643 78.8647 120.556 97.7671 120.556C116.669 120.556 133.054 128.643 141.105 140.455C133.054 152.267 116.669 160.354 97.7671 160.354C78.8647 160.354 62.4806 152.267 54.4296 140.455Z"
            fill="url(#paint0_linear_208_71)"
          />
          <path
            d="M54.1375 52.6875C62.1834 41.0008 78.557 33 97.4473 33C116.338 33 132.711 41.0008 140.757 52.6875C132.711 64.3742 116.338 72.375 97.4473 72.375C78.557 72.375 62.1834 64.3742 54.1375 52.6875Z"
            fill="url(#paint1_linear_208_71)"
          />
          <path
            d="M98.275 96.9096C86.569 108.499 70.6923 115.009 54.1375 115.009C37.5827 115.009 21.706 108.499 10 96.9096L54.1375 52.6875L98.275 96.9096Z"
            fill="url(#paint2_linear_208_71)"
          />
          <path
            d="M185 96.9314C173.294 108.521 157.417 115.031 140.862 115.031C124.308 115.031 108.431 108.521 96.725 96.9314L140.862 52.6875L185 96.9314Z"
            fill="url(#paint3_linear_208_71)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_208_71"
              x1="97.7671"
              y1="120.556"
              x2="97.7671"
              y2="160.354"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6E4FED" />
              <stop offset="0.692708" stopColor="#A96FDC" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_208_71"
              x1="97.5"
              y1="33"
              x2="97.5"
              y2="115.031"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.265625" stopColor="#ED9CA2" />
              <stop offset="0.9999" stopColor="#A96FDC" />
              <stop offset="1" stopColor="#A96FDC" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_208_71"
              x1="97.5"
              y1="33"
              x2="97.5"
              y2="115.031"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.265625" stopColor="#ED9CA2" />
              <stop offset="0.9999" stopColor="#A96FDC" />
              <stop offset="1" stopColor="#A96FDC" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_208_71"
              x1="97.5"
              y1="33"
              x2="97.5"
              y2="115.031"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.265625" stopColor="#ED9CA2" />
              <stop offset="0.9999" stopColor="#A96FDC" />
              <stop offset="1" stopColor="#A96FDC" />
            </linearGradient>
          </defs>
        </svg>

        <span className="ml-2 mr-2 font-extrabold hidden text-lg md:inline">
          Million
        </span>
      </>
    );
  },
  footerEditLink: () => {
    return 'Edit this page on GitHub →';
  },
  tocExtraContent: () => {
    return (
      <a
        className="text-xs font-medium no-underline block text-gray-500 mb-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/aidenybai/million-react-compat"
      >
        Become a sponsor 💝 →
      </a>
    );
  },
};

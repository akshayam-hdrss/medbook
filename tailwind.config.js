import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#FFFFFF",
      secondary: "#801F00",
      grey: "#727272",
      kaavi: "#FF3B10",
    },
    plugins: [],
    extend: {
      fontFamily: {
        koulen: ["var(--font-koulen)"],
        inter: ["var(--font-inter)"],
        lena: ["lena-400", "sans-serif"],
        himalaya: ["himalaya", "serif"],
      },
      backgroundImage: {
        pattern: "url('/om.svg')",
        "gradient-w-b":
          "linear-gradient(180deg, hsla(0, 0%, 100%, 1) 11%, hsla(0, 0%, 0%, 1) 86%)",
      },
    },
  },
});

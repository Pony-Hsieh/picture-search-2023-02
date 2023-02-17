/** @type {import('tailwindcss').Config} */
module.exports = {
  // 要解析的檔案資料夾設置
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {},
    },
  },
  plugins: [],
};

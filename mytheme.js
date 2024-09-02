export const mytheme = {
    name: 'mytheme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "255 255 255",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #2D6A4F 
        "--color-primary-50": "224 233 229", // #e0e9e5
        "--color-primary-100": "213 225 220", // #d5e1dc
        "--color-primary-200": "203 218 211", // #cbdad3
        "--color-primary-300": "171 195 185", // #abc3b9
        "--color-primary-400": "108 151 132", // #6c9784
        "--color-primary-500": "45 106 79", // #2D6A4F
        "--color-primary-600": "41 95 71", // #295f47
        "--color-primary-700": "34 80 59", // #22503b
        "--color-primary-800": "27 64 47", // #1b402f
        "--color-primary-900": "22 52 39", // #163427
        // secondary | #E3C7A0 
        "--color-secondary-50": "251 247 241", // #fbf7f1
        "--color-secondary-100": "249 244 236", // #f9f4ec
        "--color-secondary-200": "248 241 231", // #f8f1e7
        "--color-secondary-300": "244 233 217", // #f4e9d9
        "--color-secondary-400": "235 216 189", // #ebd8bd
        "--color-secondary-500": "227 199 160", // #E3C7A0
        "--color-secondary-600": "204 179 144", // #ccb390
        "--color-secondary-700": "170 149 120", // #aa9578
        "--color-secondary-800": "136 119 96", // #887760
        "--color-secondary-900": "111 98 78", // #6f624e
        // tertiary | #757580 
        "--color-tertiary-50": "234 234 236", // #eaeaec
        "--color-tertiary-100": "227 227 230", // #e3e3e6
        "--color-tertiary-200": "221 221 223", // #dddddf
        "--color-tertiary-300": "200 200 204", // #c8c8cc
        "--color-tertiary-400": "158 158 166", // #9e9ea6
        "--color-tertiary-500": "117 117 128", // #757580
        "--color-tertiary-600": "105 105 115", // #696973
        "--color-tertiary-700": "88 88 96", // #585860
        "--color-tertiary-800": "70 70 77", // #46464d
        "--color-tertiary-900": "57 57 63", // #39393f
        // success | #1EAE9B 
        "--color-success-50": "221 243 240", // #ddf3f0
        "--color-success-100": "210 239 235", // #d2efeb
        "--color-success-200": "199 235 230", // #c7ebe6
        "--color-success-300": "165 223 215", // #a5dfd7
        "--color-success-400": "98 198 185", // #62c6b9
        "--color-success-500": "30 174 155", // #1EAE9B
        "--color-success-600": "27 157 140", // #1b9d8c
        "--color-success-700": "23 131 116", // #178374
        "--color-success-800": "18 104 93", // #12685d
        "--color-success-900": "15 85 76", // #0f554c
        // warning | #FFD050 
        "--color-warning-50": "255 248 229", // #fff8e5
        "--color-warning-100": "255 246 220", // #fff6dc
        "--color-warning-200": "255 243 211", // #fff3d3
        "--color-warning-300": "255 236 185", // #ffecb9
        "--color-warning-400": "255 222 133", // #ffde85
        "--color-warning-500": "255 208 80", // #FFD050
        "--color-warning-600": "230 187 72", // #e6bb48
        "--color-warning-700": "191 156 60", // #bf9c3c
        "--color-warning-800": "153 125 48", // #997d30
        "--color-warning-900": "125 102 39", // #7d6627
        // error | #E04040 
        "--color-error-50": "250 226 226", // #fae2e2
        "--color-error-100": "249 217 217", // #f9d9d9
        "--color-error-200": "247 207 207", // #f7cfcf
        "--color-error-300": "243 179 179", // #f3b3b3
        "--color-error-400": "233 121 121", // #e97979
        "--color-error-500": "224 64 64", // #E04040
        "--color-error-600": "202 58 58", // #ca3a3a
        "--color-error-700": "168 48 48", // #a83030
        "--color-error-800": "134 38 38", // #862626
        "--color-error-900": "110 31 31", // #6e1f1f
        // surface | #333D4F 
        "--color-surface-50": "224 226 229", // #e0e2e5
        "--color-surface-100": "214 216 220", // #d6d8dc
        "--color-surface-200": "204 207 211", // #cccfd3
        "--color-surface-300": "173 177 185", // #adb1b9
        "--color-surface-400": "112 119 132", // #707784
        "--color-surface-500": "51 61 79", // #333D4F
        "--color-surface-600": "46 55 71", // #2e3747
        "--color-surface-700": "38 46 59", // #262e3b
        "--color-surface-800": "31 37 47", // #1f252f
        "--color-surface-900": "25 30 39", // #191e27

    }
}

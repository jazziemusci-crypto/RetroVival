/**
 * ============================================================
 *  EDIT THIS FILE to set your password and links.
 *  No coding knowledge needed — just replace the text
 *  inside the quotes " " with your own values.
 * ============================================================
 */

const CONFIG = {

  // The password needed to open the portal.
  // Change this to whatever you want.
  password: "retrovival2026",

  // Opens in a NEW TAB when clicked
  adminDashboardUrl: "https://docs.google.com/spreadsheets/d/1VdhAM2tUF3HQOMNBWpAY0R_dzD8VLQuPlZjNbfyt8PY/edit?gid=2032770637#gid=2032770637",

  // Opens in a NEW TAB when clicked
  // (This is the "Order Management" TAB inside your Admin Dashboard sheet.
  //  Right-click the "Order Management" tab in Google Sheets → "Copy link to sheet"
  //  and paste that full link here — it includes a #gid=... at the end.)
  orderManagementUrl: "https://docs.google.com/spreadsheets/d/1c_zNBQRi30Ez6xcQNivXWXNx-BdXFHjnndp-0Th9V7s/edit?gid=0#gid=0",

  // Shown INSIDE the site as a preview (not a new tab).
  // For a Google Form, add "?embedded=true" to the end of your form's normal link.
  formsUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfhX1sp6wm_84WZ_p2utW3FwcIM-QbkARvAN0ChcrtOLCL7ZA/preview",

  // List of individual invoices. Add one line per invoice.
  // "name" = what shows in the sidebar list
  // "url"  = the invoice's Google Sheet link, with /edit changed to /preview
  //          (Example: change ".../edit?usp=sharing" to ".../preview")
  invoices: [
    { name: "RV0001 - Rubielyn Rebollos", url: "https://docs.google.com/spreadsheets/d/1bIgotX73j2CctJQpDWLDjfHqwWtaG76PULI4OsHLMEU/preview" },
    { name: "RV0002 - Ruby Kimberley Bonclaes", url: "https://docs.google.com/spreadsheets/d/1q-dEsurGICAI15SOjqsRUIDOFSGjp2M1-JGNSmvrzDE/preview" },
    { name: "RV0003 - Jackielou Chavez", url: "https://docs.google.com/spreadsheets/d/1FGvVoThDmgqXVg9u3NH1sbZE968tmPaPzF7cUUDW5SU/preview" },
    { name: "RV0005 - Jason L. Williams", url: "https://docs.google.com/spreadsheets/d/104B1zB6t1Hvj4387wg_m0ZznhbFZiqLlXQ08zd3qQEw/preview" },
    { name: "RV0008 - Sophia Franchesca P. Gonzalo", url: "https://docs.google.com/spreadsheets/d/1jisXV0RdHnEv2BNgLDqpJnFM8S1q6PjMqnX7k-SI-lI/preview" },
    { name: "RV0010 - Daisy Lyn Giron", url: "https://docs.google.com/spreadsheets/d/1BAIfN-x_eOabpJLAwYRf_fDXF70afLBjd4UKnTCdV2Q/preview" },
    { name: "RV0010 - Mycah Cabiles", url: "https://docs.google.com/spreadsheets/d/1-R2obWU1nKaPr1I2guLDnqh-iR7UrIfmh70coC4s310/preview" }
  ]

};
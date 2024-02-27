export function formatDateThai(dateString: string) {
  const monthsThai = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const date = new Date(dateString);

  // Adjust the time zone to Thai time zone
  const thaiDate = date.toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = date.toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    hour: "numeric",
    minute: "numeric",
  });

  return `${thaiDate} / ${time} น.`;
}

export const getCarImageCandidates = (car) => {
  if (!car) return [];
  const rawList = [];

  const add = (val) => {
    if (!val) return;
    if (typeof val === "string") {
      let trimmed = val.trim();
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
        if (trimmed.startsWith("http://")) trimmed = trimmed.replace(/^http:\/\//i, "https://");
        rawList.push(trimmed);
      }
    } else if (typeof val === "object") {
      const candidate = val.url || val.src || val.image || val.headImage;
      if (candidate && typeof candidate === "string") add(candidate);
    }
  };

  add(car.image);
  add(car.headImage);
  if (Array.isArray(car.images)) car.images.forEach(add);

  return Array.from(new Set(rawList));
};

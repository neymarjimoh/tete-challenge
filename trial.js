const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};

console.log(isEmpty({ a: "g" }));

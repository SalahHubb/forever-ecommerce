export default function filterCollections(products, categories, types) {
  let filtered = [];

  // categories = [] , types = []
  if (categories.length == 0 && types.length == 0) {
    filtered = [...products];
  }

  // categories = [], types = ['winterWear', ..]
  if (categories.length == 0 && types.length > 0) {
    // filter all products with each type
    types.forEach((type) => {
      filtered = [
        ...filtered,
        ...products.filter((product) => {
          return product.subCategory.toLowerCase() === type.toLowerCase();
        }),
      ];
    });
  }

  // categories = ['men', ..], types = ['topWear', ..] / types= []
  if (categories.length > 0) {
    categories.forEach((category) => {
      console.log(category, category);
      if (types.length == 0) {
        filtered = [
          ...filtered,
          ...products.filter(
            (product) =>
              product.category.toLowerCase() === category.toLowerCase()
          ),
        ];
      } else {
        types.forEach((type) => {
          filtered = [
            ...filtered,
            ...products.filter((product) => {
              return (
                product.category.toLowerCase() === category.toLowerCase() &&
                product.subCategory.toLowerCase() === type.toLowerCase()
              );
            }),
          ];
        });
      }
    });
  }

  return filtered;
}

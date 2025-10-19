const ELEMENTS = [
  { name: "maasha1", image: "/assets/m1.png" },
  { name: "maasha2", image: "/assets/m2.png" },
  { name: "elsa", image: "/assets/m3.png" },
  { name: "olaf", image: "/assets/m4.png" },
  { name: "tom&jerry", image: "/assets/m5.png" },
  { name: "shinchan", image: "/assets/m6.png" },
  { name: "spider", image: "/assets/m7.png" },
  { name: "lilo", image: "/assets/m8.png" },
  // Duplicate some elements for hard mode (6x6 = 18 pairs)
  { name: "maasha1_dup", image: "/assets/m1.png" },
  { name: "maasha2_dup", image: "/assets/m2.png" },
  { name: "elsa_dup", image: "/assets/m3.png" },
  { name: "olaf_dup", image: "/assets/m4.png" },
  { name: "tom&jerry_dup", image: "/assets/m5.png" },
  { name: "shinchan_dup", image: "/assets/m6.png" },
  { name: "spider_dup", image: "/assets/m7.png" },
  { name: "lilo_dup", image: "/assets/m8.png" },
  // Add more duplicates to reach 18 pairs
  { name: "maasha1_dup2", image: "/assets/m1.png" },
  { name: "maasha2_dup2", image: "/assets/m2.png" },
];


const getElements = (count = 2) => {
  let res = [];
  for (let i = 0; i < count; i++) {
    res.push({
      name: ELEMENTS[i].name,
      image: ELEMENTS[i].image,
      status: '',
    });
    res.push({
      name: ELEMENTS[i].name,
      image: ELEMENTS[i].image,
      status: '',
    });
  }
  return res.sort(() => Math.random() -0.5 ); // shuffled pairs
};

export { getElements };

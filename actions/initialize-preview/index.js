const asyncAction = async () => {
  console.log("async action");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("async timeout action");
      resolve();
    }, 1000);
  });
};

const main = async () => {
  console.log("syncronoius action", process.env.INPUT_PR_NUMBER, process.env.INPUT_SERVICE);
  setTimeout(() => {
    console.log("timeout action");
  }, 1000);

  await asyncAction();
};

main();
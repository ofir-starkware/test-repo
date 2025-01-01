const asyncAction = async () => {
  console.log("async action");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("async timeout action");
      resolve(5);
    }, 30000);
  });
};

const main = async () => {
  console.log("syncronoius action", process.env.INPUT_PR_NUMBER, process.env.INPUT_SERVICE_NAME);

  const a = await asyncAction();
  console.log("after async action", a);
};

main();

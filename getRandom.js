const getRandom = (() => {
    number = (maxNumber = 10000000000) => {
        return Math.floor((Math.random() * maxNumber));
    }

    productName = () => {
        let text = "";
        const possible = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    cost = () => {
        return Math.floor((Math.random() * 1000));
    }

    return {
        number: number,
        name: productName,
        cost: cost,
    }
})();

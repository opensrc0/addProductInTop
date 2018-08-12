const List = (() => {
    const config = {};
    const globalVar = {};

    config.pageSize = 20;
    globalVar.productLoaded = 0;

    getProduct = (id, name, cost) => {
         return {
            id: id || getRandom.number(),
            name: name || `${getRandom.name()} ${getRandom.name()}`,
            cost: cost || getRandom.cost(),
        }
    }

    getProductList = () => {
        const productList = [];

        for(let i = 0; i < 55; i++) {
            productList.push(getProduct());
        }

        return productList;
    }

    const productList = getProductList();

    templete = (product) => {
        if(product) {
            return `
                <div class="list">
                    <div style="margin-bottom: 5px;">
                        <span style="font-weight:bold;">Product Id:-</span>
                        ${product.id}
                    </div>
                    <div style="float: left;">${product.name}</div>
                    <div style="float: right;"> &#8377; ${product.cost}</div>
                    <div style="clear: both;"></div>
                </div>
            `;
        }
    }

    lazyLoadProduct = () => {
        let template = '';
        const { productLoaded } = globalVar;
        const { pageSize } = config;
        const endLoop = (productList.length > (pageSize + productLoaded)) ? (pageSize + productLoaded) : productList.length;

        for(let i = 0 + productLoaded; i < endLoop; i++) {
            getProductTemplete = templete(productList[i]);
            template += getProductTemplete;
        }
        globalVar.productLoaded  = productLoaded  + pageSize;

        return template;
    }

    throttling = (cb) => {
        let isScrolling;
        window.addEventListener('scroll', function ( event ) {
            window.clearTimeout( isScrolling );
            isScrolling = setTimeout(function() {
                cb();
            }, 0);
        });
    }

    listener = () => {
        document.querySelector('#saveProduct').addEventListener("click", () => {
            productId = document.querySelector('#productId').value;
            productName = document.querySelector('#productName').value;
            productCost = document.querySelector('#productCost').value;
            productItem = templete(getProduct(productId, productName, productCost));
            document.querySelector('#app').insertAdjacentHTML( 'afterbegin', productItem);
            window.scrollTo(0, 0);
            modal.style.display = "none";
        });

        window.addEventListener("scroll", throttling(() => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight 
                && (globalVar.productLoaded < productList.length)
            ) {
                document.querySelector('#app').innerHTML += lazyLoadProduct();
            }
        }));
    }

    init = () => {
        document.querySelector('#app').innerHTML = lazyLoadProduct();
        listener();
        window.scrollTo(0, 0);
    }

    return {
        init: init,
    }
})();

List.init();
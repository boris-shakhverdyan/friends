import { useEffect, useState } from "react";
import "./style.scss";
import Product from "./Product";

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage] = useState(12);
    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const [products, setProducts] = useState<any[]>([]);

    const indexOfLastProduct = currentPage * productsPerPage;

    const changeCurrentPage = (page: number) => {
        let container = document.getElementById("container");

        if (container) {
            container.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }

        setCurrentPage(page);
    };

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${indexOfLastProduct}`)
            .then((res) => res.json())
            .then((data) => {
                setTotalProductsCount(data.total);
                setProducts(data.products);
            });
    }, [productsPerPage, indexOfLastProduct]);

    const pages = [];

    for (let i = 0; i < totalProductsCount / productsPerPage; i++) {
        pages.push(
            <span key={i} className={currentPage === i ? "active" : ""} onClick={() => changeCurrentPage(i)}>
                {i + 1}
            </span>
        );
    }

    return (
        <div className="shop">
            {products.map((product) => (
                <Product key={product.id} {...product} />
            ))}

            <div className="pagination">{pages}</div>
        </div>
    );
};

export default Shop;

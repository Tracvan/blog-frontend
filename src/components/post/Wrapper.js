import {useState} from "react";
const Wrapper = ({children}) => {
    let [largestPosition, setLargestPosition] = useState(150);
    let [currentPage, setCurrentPage] = useState(0);
    window.addEventListener('scroll', function() {
        var scrollPosition = window.pageYOffset;
        if (scrollPosition > largestPosition) {
            setTimeout(()=>{
                currentPage += 1;
                setCurrentPage(prevPage => prevPage + 1)
            },1000)
            largestPosition += 200;
            setLargestPosition(largestPosition);
        }
    });
    return children
}
export default Wrapper
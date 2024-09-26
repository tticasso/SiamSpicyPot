import { Link } from 'react-router-dom';
import './Sales.css';

export default function Sales() {
    return (
        <div className="sales-page">
            <div className="message-container">
                <p className="message">
                    Chưa có chương trình khuyến mãi nào cạ. Quay lại sau nhé khách iu ❤️
                </p>
                <button className="continue-button">
                    <Link to={"/menu"} className="link-button">Tiếp tục xem đồ ăn</Link>
                </button>
            </div>
        </div>
    );
}

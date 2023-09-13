import './directory-component.scss';
import CategoryItem from '../category-item/category-item.component.jsx';

const Directory = ({ categories }) => {
    return(
        <div className='directory-container'>
            {categories.map((category) => {
                return(
                    <CategoryItem key={category.id} category={category} />
                )
            })}
        </div>
    )
}

export default Directory;
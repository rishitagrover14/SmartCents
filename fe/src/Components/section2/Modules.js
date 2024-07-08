import ModuleTemplate from './ModuleTemplete';
import './Modules.css'
function Modules(){
    return (
       <div className='sec'> 
            <div id='Why Us'className='guide'>Why Us?</div>
            <div className='tagline'>At <span>SmartCents</span>, we believe that financial literacy is the cornerstone of a secure and prosperous future. Unlike traditional methods of learning, we make financial education engaging and interactive through innovative games,budgeting tools and quizes. Our focus isnot only to provide knowledge but also have fun while doing so. Whether you're just starting your financial journey or looking to refine your money management skills, our platform is designed to cater to all levels. Join us to transform the way you understand and handle finances</div>
         
         <ModuleTemplate/>
       </div>
    )
}
export default Modules;
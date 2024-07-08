import NavBlack from '../navbarBlack/NavBlack'
import './Onbuy.css'
function Onbuy(){
    return(
        <div>
        <NavBlack/>
            <h2 className='headingg'>Please Confirm that you have all these documents needed to buy a property</h2>
           
            <div className='formm'>
                <form>
                    <div className='allquest'>
                    <div className='questionn1'>
                    <input type="checkbox" id="prop1" className="prop"></input>
                    <label class='prop1'for="prop1">
                        <h3>Agreement to sell
                        </h3>
                        </label>
                        <p className='paraashmeet'>Information related to Sales,description of the property, and the terms and conditions agreed upon between the buyer and the seller.</p></div>

                       <div className='questionn1'>
                        <input type="checkbox" id="prop" className="prop"></input>
                    <label for="prop2">
                        <h3>Absolute sale deed and title deed
                        </h3>
                       </label>
                       <p className='paraashmeet'> Record of the actual transfer of ownership of the property</p></div>
                       <div className='questionn1'> 
                        <input type="checkbox" id="prop3" className="prop"></input>
                    <label for="prop3">
                        <h3>Title search and report 
                        </h3>
                       </label>
                       <p className='paraashmeet'> This document is required when one is applying for a Home Loan. The title search document has the information of previous owners, and tenants, a description of the property, etc. </p></div>
                        <div className='questionn1'><input type="checkbox" id="prop4" className="prop"></input>
                    <label for="prop4">
                        <h3>Khata certificate  
                        </h3>
                        </label>
                        <p className='paraashmeet'> This document acts as proof that the property has an entry in the local authority records.</p> </div>
                        <div className='questionn1'><input type="checkbox" id="prop5" className="prop"></input>
                    <label for="prop5">
                        <h3>Receipt of property tax
                        </h3>
                        </label>
                        <p className='paraashmeet'> This document holds evidence that all the taxes have been paid by the previous owner.</p></div>
                        <div className='questionn1'><input type="checkbox" id="prop6" className="prop"></input>
                    <label for="prop6">
                        <h3>Encumbrance certificate 
                        </h3>
                        </label>
                        <p className='paraashmeet'> This document has all the details of transactions relating to the property.</p></div>
                        <div className='questionn1'> <input type="checkbox" id="prop7" className="prop"></input>
                    <label for="prop7">
                        <h3>Occupancy certificate 
                        </h3>
                        </label>
                        <p className='paraashmeet'> The occupancy certificate is given by the municipal corporation after the construction of the building.</p></div>
                        <div className='questionn1'> <input type="checkbox" id="prop8" className="prop"></input>
                    <label for="prop8">
                        <h3>Non-objection certificate
                        </h3>
                        </label>
                        <p className='paraashmeet'> The occupancy certificate is given by the municipal corporation after the construction of the building.</p></div>
                        <div className='questionn1'><input type="checkbox" id="prop9" className="prop"></input>
                    <label for="prop9">
                        <h3>Sanctioned building plan by statutory authority
                        </h3>
                        </label><p className='paraashmeet'> This document is to ensure that the buyer is cautious of any deviation from the Sanctioned plan made by the developer. 

</p></div>
<div className='questionn1'><input type="checkbox" id="prop10" className="prop"></input>
                    <label for="prop10">
                        <h3>Power of attorney, if any
                        </h3>
                        </label>
                        <p className='paraashmeet'> An original Power of attorney is required to state if any person is acting on the authorization of the owner of the property.  

</p></div></div>
                </form>
                <button className='butttt'>Continue and Buy</button>
            </div>
        </div>
    )
}
export default Onbuy
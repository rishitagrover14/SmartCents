import './Footer.css'
import logoAshmeet from'./logoAshmeet.png';

function Footer(){
    return (<footer class="footer-distributed">

    <div class="footer-left">

      <div className='img'><img src={logoAshmeet}/></div>

      <p class="footer-links">
        <a href="#">Home</a> ·
        <a href="#">About</a> ·
        <a href="#">Pricing</a> ·
        <a href="#">About</a> ·
        <a href="#">Faq</a> ·
        <a href="#">Contact</a>
      </p>

      <p class="footer-company-name">copyright &copy; 2024</p>
    </div>

    <div class="footer-center">

      <div>
        <i class="fa fa-map-marker"></i>
        <p><span>Thapar University</span> Prem nagar</p>
      </div>

      <div>
        <i class="fa fa-phone"></i>
        <p>+91-6283788834</p>
      </div>

      <div>
        <i class="fa fa-envelope"></i>
        <p><a href="mailto:rrgrover13@gmail.com" target='blank'>support@smartcents.com</a></p>
      </div>

    </div>

    <div class="footer-right">

      <p class="footer-company-about">
        <span>About us</span> Bridging Financial Wisdom With Practicalitly
      </p>

      <div class="footer-icons">

        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/rishitagrover14?tab=repositories" target='blank'><i class="fab fa-github" aria-hidden="true"></i></a>

      </div>

    </div>

  </footer>
)
}
export default Footer;
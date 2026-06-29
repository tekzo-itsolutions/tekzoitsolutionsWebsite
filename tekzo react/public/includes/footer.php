  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="logo/tekzo-logo.svg" alt="Tekzo IT Solutions">
          <p>Transforming ideas into powerful digital solutions. Your trusted partner for web development, design, and social media excellence.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="company-details.html">Company Details</a></li>
            <li><a href="vision-mission.html">Vision & Mission</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="services.html">Web Development</a></li>
            <li><a href="services.html">Logo Design</a></li>
            <li><a href="services.html">Branding</a></li>
            <li><a href="services.html">Social Media</a></li>
            <li><a href="services.html">UI/UX Design</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Newsletter</h4>
          <p style="font-size:0.9rem;color:var(--hover);margin-bottom:16px;">Subscribe for updates and insights.</p>
          <form class="newsletter-form" action="api/newsletter.php" method="POST">
            <input type="email" name="email" placeholder="Your email" required>
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <?php echo date('Y'); ?> Tekzo IT Solutions. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  <button class="back-to-top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="script.js"></script>
</body>
</html>

<script>
    import "../app.css";
  </script>
  
  <div class="min-h-screen">
    
      <slot />
    
      <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded sticky top-[100vh]">
        <nav class="grid grid-flow-col gap-4">
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Disclaimer</a>
          <a class="link link-hover">Contact</a>
        </nav> 
        <aside>
          <p>Copyright © 2023 - All right reserved by playcards.games</p>
        </aside>
      </footer>
      
  </div>
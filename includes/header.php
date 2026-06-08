<?php
/**
 * Tekzo IT Solutions - Shared Header
 * Usage: $activePage = 'home'; include 'includes/header.php';
 */
$activePage = $activePage ?? '';
$pages = [
  'home' => ['index.html', 'Home'],
  'about' => ['about.html', 'About Us'],
  'company' => ['company-details.html', 'Company Details'],
  'vision' => ['vision-mission.html', 'Vision & Mission'],
  'services' => ['services.html', 'Services'],
  'portfolio' => ['portfolio.html', 'Portfolio'],
  'contact' => ['contact.html', 'Contact Us'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle ?? 'Tekzo IT Solutions'; ?></title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="loader">
    <img src="logo/tekzo-logo.svg" alt="Tekzo IT Solutions" class="loader-logo">
    <div class="loader-bar"><div class="loader-progress"></div></div>
  </div>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">
          <img src="logo/tekzo-logo.svg" alt="Tekzo IT Solutions Logo">
        </a>
        <ul class="nav-menu">
          <?php foreach ($pages as $key => $page): ?>
          <li>
            <a href="<?php echo $page[0]; ?>" class="nav-link <?php echo ($activePage === $key) ? 'active' : ''; ?>">
              <?php echo $page[1]; ?>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
        <div class="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </div>
      </nav>
    </div>
  </header>

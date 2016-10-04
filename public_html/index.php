<!-- Pageviews Analysis tool -->
<!-- Copyright 2016 MusikAnimal -->
<?php $currentApp = "pageviews"; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php include '_head.php'; ?>
    <title><?php echo $I18N->msg( 'title' ); ?></title>
  </head>
  <body class="<?php echo $rtl; ?> <?php echo $currentApp; ?>">
    <?php include '_header.php'; ?>
    <aside class="col-lg-2 page-selector">
      <header class="text-center">
        <h4>Options</h4>
      </header>
      <div class="page-selector--container">
        <div>
          <label for="range-input">
            <?php echo $I18N->msg( 'dates' ); ?>
          </label>
          <input class="form-control aqs-date-range-selector" id="range-input">
        </div>
        <div>
          <label for="project-input">
            <?php echo $I18N->msg( 'project' ); ?>
          </label>
          <input class="form-control aqs-project-input" id="project-input" placeholder="en.wikipedia.org">
        </div>
        <div>
          <label for="platform-select">
            <?php echo $I18N->msg( 'platform' ); ?>
          </label>
          <select class="form-control" id="platform-select">
            <option value="all-access">
              <?php echo $I18N->msg( 'all' ); ?>
            </option>
            <option value="desktop">
              <?php echo $I18N->msg( 'desktop' ); ?>
            </option>
            <option value="mobile-app">
              <?php echo $I18N->msg( 'mobile-app' ); ?>
            </option>
            <option value="mobile-web">
              <?php echo $I18N->msg( 'mobile-web' ); ?>
            </option>
          </select>
        </div>
        <div>
          <label for="agent-select">
            <?php echo $I18N->msg( 'agent' ); ?>
            <a class="help-link" href="/pageviews/faq#agents">
              <span class="glyphicon glyphicon-question-sign"></span>
            </a>
          </label>
          <select class="form-control" id="agent-select">
            <option value="all-agents">
              <?php echo $I18N->msg( 'all' ); ?>
            </option>
            <option selected="selected" value="user">
              <?php echo $I18N->msg( 'user' ); ?>
            </option>
            <option value="spider">
              <?php echo $I18N->msg( 'spider' ); ?>
            </option>
            <option value="bot">
              <?php echo $I18N->msg( 'bot' ); ?>
            </option>
          </select>
        </div>
        <div>
          <label for="article-input">
            <?php echo $I18N->msg( 'pages' ); ?>
          </label>
          <select class="aqs-select2-selector col-lg-12 invisible" id="article-input" multiple="multiple"></select>
        </div>
      </div>
    </aside>
    <main class="col-lg-8">
      <!-- Site notice -->
      <div class="text-center site-notice-wrapper">
        <div class="site-notice">
          <?php include "_browser_check.php"; ?>
        </div>
      </div>
      <?php include "_data_links.php"; ?>
      <!-- Chart -->
      <div class="chart-container">
        <canvas class="aqs-chart"></canvas>
      </div>
      <div class="message-container col-lg-12"></div>
    </main>
    <aside class="col-lg-2 summary-column">
      <header class="text-center">
        <h4>Summary</h4>
      </header>
      <div class="summary-column--container">
        <div class="col-lg-12 clearfix" id="chart-legend"></div>
      </div>
    </aside>
    <?php include "_footer.php"; ?>
    <?php include "_modals.php"; ?>
  </body>
</html>
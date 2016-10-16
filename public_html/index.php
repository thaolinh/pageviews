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
    <div class="text-center site-notice-wrapper">
      <div class="site-notice">
        <?php include "_browser_check.php"; ?>
      </div>
    </div>
    <?php include '_header.php'; ?>
    <aside class="col-lg-2 col-md-2 page-selector">
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
      </div>
    </aside>
    <main class="col-lg-8 col-md-10">
      <div>
        <label for="article-input">
          <?php echo $I18N->msg( 'pages' ); ?>
        </label>
        <select class="aqs-select2-selector col-lg-12 invisible" id="article-input" multiple="multiple"></select>
      </div>
      <?php include "_data_links.php"; ?>
      <!-- Chart -->
      <div class="chart-container">
        <canvas class="aqs-chart"></canvas>
      </div>
      <div class="message-container col-lg-12"></div>
    </main>
    <aside class="col-lg-2 col-md-12 summary-column">
      <header class="text-center">
        <h4>Totals</h4>
      </header>
      <div class="summary-column--container">
        <div class="chart-legend col-lg-12 clearfix"></div>
      </div>
    </aside>
    <output class="table-view col-lg-10 col-lg-offset-1">
      <?php
        $columns = array(
          'title' => 'page-title',
          'views' => 'views',
          'average' => 'daily-views',
          'edits' => 'edits',
          'editors' => 'editors',
          'size' => 'size',
          'protection' => 'protection',
          'watchers' => 'watchers'
        );
      ?>
      <table class="table table-hover">
        <thead class="table-view--header">
          <tr>
            <th></th>
            <?php foreach( $columns as $column => $translation ) { ?>
              <th class="table-view--<?php echo $column; ?>">
                <span class="sort-link sort-link--<?php echo $column; ?>" data-type="<?php echo $column; ?>">
                  <?php echo $I18N->msg( $translation ); ?>
                  <span class="glyphicon glyphicon-sort"></span>
                </span>
              </th>
            <?php } ?>
            <th>
              <span>Links</span>
            </th>
          </tr>
        </thead>
        <tbody class="output-list"></tbody>
      </table>
    </output>
    <?php include "_footer.php"; ?>
    <?php include "_modals.php"; ?>
  </body>
</html>

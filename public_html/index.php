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
    <nav>
      <span class="pull-right nav-buttons">
        <button class="btn btn-default btn-sm btn-settings js-test-settings" data-target="#settings-modal" data-toggle="modal">
          <span class="glyphicon glyphicon-wrench"></span>
          <?php echo $I18N->msg( 'settings' ); ?>
        </button>
        <a class="btn btn-default btn-sm btn-faq" href="/pageviews/faq">
          <span class="glyphicon glyphicon-question-sign"></span>
          <?php echo $I18N->msg( 'faq' ); ?>
        </a>
        <span class="btn-group dropdown lang-group pull-right">
          <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <?php echo $currentLang; ?>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <a href="https://translatewiki.net/w/i.php?title=Special:MessageGroupStats&group=out-pageviews">
                <?php echo $I18N->msg( 'help-translate' ); ?>
              </a>
            </li>
            <li class="divider" role="separator"></li>
            <?php foreach (array_unique($langs) as $lang => $langName) { ?>
              <li>
                <a class="lang-link" href="#" data-lang="<?php echo $lang; ?>"><?php echo $langName; ?></a>
              </li>
            <?php } ?>
          </ul>
        </span>
      </span>
      <ul class="interapp-links nav nav-tabs">
        <?php $apps = [ 'pageviews', 'langviews', 'topviews', 'siteviews', 'massviews', 'redirectviews' ]; ?>
        <?php foreach( $apps as $app ) { ?>
          <?php $i18nName = $app === 'pageviews' ? '' : $app . '-'; ?>
          <?php if ( $app === $currentApp ) { ?>
            <li class="active" role="presentation">
              <a class="interapp-link" class="interapp-link--<?php echo $app; ?>" href="/<?php echo $app; ?>">
                <?php echo $I18N->msg( $app ); ?>
              </a>
            </li>
          <?php } else { ?>
            <li role="presentation">
              <a class="interapp-link" class="interapp-link--<?php echo $app; ?>" href="/<?php echo $app; ?>">
                <?php echo $I18N->msg( $app ); ?>
              </a>
            </li>
          <?php } ?>
        <?php } ?>
      </ul>
    </nav>
    <header class="site-header">
      <h4 class="text-center">
        <strong>
          <?php echo $I18N->msg( 'title' ); ?>
        </strong>
        <small class="app-description">
          <?php echo $I18N->msg( 'pageviews-description' ); ?>
        </small>
      </h4>
    </header>
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
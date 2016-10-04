<nav>
  <span class="pull-right nav-buttons">
    <button class="btn btn-default btn-sm btn-settings js-test-settings" data-target="#settings-modal" data-toggle="modal">
      <span class="glyphicon glyphicon-wrench"></span>
      <?php echo $I18N->msg( 'settings' ); ?>
    </button>
    <a class="btn btn-default btn-sm btn-faq" href="/<?php echo $currentApp; ?>/faq">
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
      <?php if ( $currentApp === 'pageviews' ) { ?>
        <?php echo $I18N->msg( 'title' ); ?>
      <?php } else { ?>
        <?php echo $I18N->msg( $currentApp . '-title' ); ?>
      <?php } ?>
    </strong>
    <small class="app-description">
      <?php echo $I18N->msg( $currentApp. '-description' ); ?>
    </small>
  </h4>
</header>
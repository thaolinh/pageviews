/**
 * @file Templates used by Chart.js for Pageviews app
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Templates used by Chart.js.
 * Functions used within our app must be in the global scope.
 * All quotations must be double-quotes or properly escaped.
 * @type {Object}
 */
const templates = {
  linearLegend(datasets, scope) {
    const dataList = entry => {
      let markup = '';

      const protectionList = entry.protection || [{ type: 'edit', level: 'none' }];

      const infoHash = {
        'Pageviews': {
          'Pageviews': scope.formatNumber(entry.sum),
          'Daily average': scope.formatNumber(entry.average)
        },
        'Revisions': {
          'Edits': `<a href="${scope.getExpandedPageURL(entry.label)}&action=history" target="_blank" class="pull-right">
              ${scope.formatNumber(entry.num_edits)}
            </a>`,
          'Editors': scope.formatNumber(entry.num_users)
        },
        'Page information': {
          'Protection': protectionList.find(prot => prot.type === 'edit').level,
          'Watchers': scope.formatNumber(entry.watchers)
        }
      };

      for (let block in infoHash) {
        markup += `<div class='legend-block'><h5>${block}</h5><hr/>`;
        for (let key in infoHash[block]) {
          markup += `
            <div class="linear-legend--counts">
              ${key}:
              <span class='pull-right'>
                ${infoHash[block][key]}
              </span>
            </div>`;
        }
        markup += '</div>';
      }

      return markup + `
        <div class="linear-legend--links">
          <a href="${scope.getLangviewsURL(entry.label)}" target="_blank">${$.i18n('all-languages')}</a>
          &bullet;
          <a href="${scope.getRedirectviewsURL(entry.label)}" target="_blank">${$.i18n('redirects')}</a>
        </div>`;
    };

    if (datasets.length === 1) {
      const pageInfo = Object.assign({}, datasets[0], scope.pageInfo[datasets[0].label]);
      return dataList(pageInfo);
    }

    const total = datasets.reduce((a,b) => a + b.sum, 0);
    let markup = '';

    markup = `<div class="linear-legend--totals">
      <span class='pull-right'>
        ${scope.formatNumber(total)} (${scope.formatNumber(Math.round(total / scope.numDaysInRange()))}/${$.i18n('day')})
      </span>
      <strong>${$.i18n('totals')}:</strong>
    </div>`;

    markup += '<div class="linear-legends">';

    for (let i = 0; i < datasets.length; i++) {
      const pageInfo = Object.assign({}, datasets[i], scope.pageInfo[datasets[i].label]);
      markup += `
        <span class="linear-legend">
          <div class="linear-legend--label" style="background-color:${scope.rgba(pageInfo.color, 0.8)}">
            <span class='pull-right remove-page glyphicon glyphicon-remove' data-article=${pageInfo.title} title='Remove page'></span>
            <a href="${scope.getPageURL(pageInfo.label)}" target="_blank">${pageInfo.label}</a>
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.sum)}
            </span>
            Pageviews:
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.average)}/${$.i18n('day')}
            </span>
            Avg pageviews:
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.num_edits)}
            </span>
            Edits:
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.num_users)}
            </span>
            Editors:
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.length)}
            </span>
            Size:
          </div>
          <div class="linear-legend--counts">
            <span class='pull-right'>
              ${scope.formatNumber(pageInfo.watchers)}
            </span>
            Watchers:
          </div>
          <div class="linear-legend--links">
            <a href="${scope.getLangviewsURL(pageInfo.label)}" target="_blank">${$.i18n('all-languages')}</a>
            &bullet;
            <a href="${scope.getRedirectviewsURL(pageInfo.label)}" target="_blank">${$.i18n('redirects')}</a>
          </div>
        </span>
      `;
    }
    return markup += '</div>';
  },

  circularLegend(datasets, scope) {
    const dataset = datasets[0],
      total = dataset.data.reduce((a,b) => a + b);
    let markup = `<div class="linear-legend--totals">
      <strong>${$.i18n('totals')}:</strong>
      ${scope.formatNumber(total)} (${scope.formatNumber(Math.round(total / scope.numDaysInRange()))}/${$.i18n('day')})
    </div>`;

    markup += '<div class="linear-legends">';

    for (let i = 0; i < dataset.data.length; i++) {
      const metaKey = Object.keys(dataset._meta)[0];
      const label = dataset._meta[metaKey].data[i]._view.label;
      markup += `
        <span class="linear-legend">
          <div class="linear-legend--label" style="background-color:${dataset.backgroundColor[i]}">
            <a href="${scope.getPageURL(label)}" target="_blank">${label}</a>
          </div>
          <div class="linear-legend--counts">
            ${scope.formatNumber(dataset.data[i])} (${scope.formatNumber(dataset.averages[i])}/${$.i18n('day')})
          </div>
          <div class="linear-legend--links">
            <a href="${scope.getLangviewsURL(label)}" target="_blank">All languages</a>
            &bullet;
            <a href="${scope.getRedirectviewsURL(label)}" target="_blank">${$.i18n('redirects')}</a>
            &bullet;
            <a href="${scope.getExpandedPageURL(label)}&action=history" target="_blank">History</a>
            &bullet;
            <a href="${scope.getExpandedPageURL(label)}&action=info" target="_blank">Info</a>
          </div>
        </span>
      `;
    }
    return markup += '</div>';
  }
};

module.exports = templates;

var K =
  (((L = {})[H.名称] = {
    fid: ['f14'],
    value: function (e) {
      return {
        txt: e.f14,
        html: t().createElement('span', null, e.f14),
        color: '',
        blink_html: t().createElement(t().Fragment, null),
        source: e.f14,
      };
    },
  }),
  (L[H.代码] = {
    fid: ['f12'],
    yl: [''],
    value: function (e) {
      return {
        txt: e.f12,
        html: t().createElement('span', null, e.f12),
        color: '',
        blink_html: t().createElement('span', null, e.f12),
        source: e.f12,
      };
    },
  }),
  (L[H.市场] = {
    fid: ['f13'],
    value: function (e) {
      return {
        txt: e.f13,
        html: t().createElement('span', null, e.f13),
        color: '',
        blink_html: t().createElement('span', null, e.f13),
        source: e.f13,
      };
    },
  }),
  (L[H.行情代码] = {
    fid: ['f12', 'f13'],
    value: function (e) {
      return {
        txt: e.f13 + '.' + e.f12,
        html: t().createElement('span', null, e.f13 + '.' + e.f12),
        color: '',
        blink_html: t().createElement('span', null, e.f13 + '.' + e.f12),
        source: e.f13 + '.' + e.f12,
      };
    },
  }),
  (L[H.行情统一链接] = {
    fid: ['f12', 'f13', 'f14'],
    value: function (e) {
      return {
        source: '',
        txt: '//quote.eastmoney.com/unify/r/'.concat(e.f13, '.').concat(e.f12),
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f13, '.').concat(e.f12),
            target: '_blank',
          },
          e.f14,
        ),
        color: '',
        blink_html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f13, '.').concat(e.f12),
            target: '_blank',
          },
          e.f14,
        ),
      };
    },
  }),
  (L[H.行情统一概念版链接] = {
    fid: ['f12', 'f13', 'f14'],
    value: function (e) {
      return {
        source: '',
        txt: '//quote.eastmoney.com/unify/cr/'.concat(e.f13, '.').concat(e.f12),
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/cr/'.concat(e.f13, '.').concat(e.f12),
            target: '_blank',
          },
          e.f14,
        ),
        color: '',
        blink_html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/cr/'.concat(e.f13, '.').concat(e.f12),
            target: '_blank',
          },
          '$',
          e.f14,
        ),
      };
    },
  }),
  (L[H.最新价] = {
    fid: ['f1', 'f2', 'f4'],
    value: function (e) {
      return Y(e.f2, e.f1, e.f4, -1);
    },
  }),
  (L[H.最新价带颜色反转判断] = {
    fid: ['f1', 'f2', 'f4', 'f13', 'f19'],
    value: function (e) {
      return '171' != e.f13 || ('1' != e.f19 && '2' != e.f19 && '4' != e.f19)
        ? Y(e.f2, e.f1, e.f4, -1)
        : Y(e.f2, e.f1, -e.f4, -1);
    },
  }),
  (L[H.是否颜色反转] = {
    fid: ['f13', 'f19'],
    value: function (e) {
      return '171' != e.f13 || ('1' != e.f19 && '2' != e.f19 && '4' != e.f19)
        ? {
            txt: 'false',
            html: t().createElement('span', null),
            color: '',
            blink_html: t().createElement('span', null),
            source: !1,
          }
        : {
            txt: 'true',
            html: t().createElement('span', null),
            color: '',
            blink_html: t().createElement('span', null),
            source: !0,
          };
    },
  }),
  (L[H.最新价人民币] = {
    fid: ['f251', 'f1', 'f4'],
    value: function (e) {
      return Y(e.f251, e.f1, e.f4, -1);
    },
  }),
  (L[H.涨跌幅] = {
    fid: ['f3', 'f152', 'f4'],
    value: function (e) {
      return Y(e.f3, e.f152, e.f4, -1, '%');
    },
  }),
  (L[H.涨跌幅带颜色反转判断] = {
    fid: ['f3', 'f152', 'f4', 'f13', 'f19'],
    value: function (e) {
      return '171' != e.f13 || ('1' != e.f19 && '2' != e.f19 && '4' != e.f19)
        ? Y(e.f3, e.f152, e.f4, -1, '%')
        : Y(e.f3, e.f152, -e.f4, -1, '%');
    },
  }),
  (L[H.涨跌幅BP] = {
    fid: ['f3', 'f152', 'f4'],
    value: function (e) {
      return Y(e.f3, 0, e.f4, -1);
    },
  }),
  (L[H.涨跌幅_5分钟] = {
    fid: ['f11', 'f152'],
    value: function (e) {
      return Y(e.f11, e.f152, e.f11, -1, '%');
    },
  }),
  (L[H.涨跌幅_3日] = {
    fid: ['f127', 'f152'],
    value: function (e) {
      return Y(e.f127, e.f152, e.f127, -1, '%');
    },
  }),
  (L[H.涨跌幅_6日] = {
    fid: ['f149', 'f152'],
    value: function (e) {
      return Y(e.f149, e.f152, e.f149, -1, '%');
    },
  }),
  (L[H.涨跌幅_5日] = {
    fid: ['f109', 'f152', 'f4'],
    value: function (e) {
      return Y(e.f109, e.f152, e.f109, -1, '%');
    },
  }),
  (L[H.涨跌幅_10日] = {
    fid: ['f160', 'f152', 'f4'],
    value: function (e) {
      return Y(e.f160, e.f152, e.f160, -1, '%');
    },
  }),
  (L[H.涨跌额] = {
    fid: ['f3', 'f152', 'f4'],
    value: function (e) {
      return Y(e.f4, e.f1, e.f4, -1);
    },
  }),
  (L[H.成交额] = {
    fid: ['f6'],
    value: function (e) {
      return Y(e.f6, -1, 0, 4);
    },
  }),
  (L[H.上涨家数] = {
    fid: ['f104'],
    value: function (e) {
      return Y(e.f104, -1, 1, -1);
    },
  }),
  (L[H.下跌家数] = {
    fid: ['f105'],
    value: function (e) {
      return Y(e.f105, -1, -1, -1);
    },
  }),
  (L[H.平盘家数] = {
    fid: ['f106'],
    value: function (e) {
      return Y(e.f106, -1, 0, -1);
    },
  }),
  (L[H.可转债申购代码] = {
    fid: ['f348'],
    value: function (e) {
      return Y(e.f348, -1, 0, -1);
    },
  }),
  (L[H.可转债申购日期] = {
    fid: ['f243'],
    value: function (e) {
      e.f243 = e.f243.toString();
      var t = 0;
      if (e.f243.toString().length >= 8) {
        e.f243 =
          e.f243.substring(0, 4) + '/' + e.f243.substring(4, 6) + '/' + e.f243.substring(6, 8);
        var n = new Date();
        n.getFullYear() == e.f243.substring(0, 4) &&
          n.getMonth() + 1 == e.f243.substring(5, 7) &&
          n.getDate() == e.f243.substring(8, 10) &&
          (t = 1);
      }
      return Y(e.f243, -1, t, -1);
    },
  }),
  (L[H.可转债转股溢价率] = {
    fid: ['f237', 'f152'],
    value: function (e) {
      return Y(e.f237, e.f152, e.f237, -1, '%');
    },
  }),
  (L[H.板块领涨股] = {
    fid: ['f128', 'f140', 'f141'],
    value: function (e) {
      return {
        source: e.f128,
        txt: e.f128,
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f141, '.').concat(e.f140),
            target: '_blank',
          },
          e.f128,
        ),
        color: '',
        blink_html: t().createElement('span', {
          dangerouslySetInnerHTML: {
            __html: '<a href="//quote.eastmoney.com/unify/r/'
              .concat(e.f141, '.')
              .concat(e.f140, '" class="blinkblue">')
              .concat(e.f128, '</a>'),
          },
        }),
      };
    },
  }),
  (L[H.板块领涨股概念版] = {
    fid: ['f128', 'f140', 'f141'],
    value: function (e) {
      return {
        source: e.f128,
        txt: e.f128,
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/cr/'.concat(e.f141, '.').concat(e.f140),
            target: '_blank',
          },
          e.f128,
        ),
        color: '',
        blink_html: t().createElement('span', {
          dangerouslySetInnerHTML: {
            __html: '<a href="//quote.eastmoney.com/unify/cr/'
              .concat(e.f141, '.')
              .concat(e.f140, '" class="blinkblue">')
              .concat(e.f128, '</a>'),
          },
        }),
      };
    },
  }),
  (L[H.板块领涨股涨跌幅] = {
    fid: ['f136'],
    value: function (e) {
      return Y(e.f136, 2, e.f136, -1, '%');
    },
  }),
  (L[H.板块领跌股] = {
    fid: ['f207', 'f208', 'f209'],
    value: function (e) {
      return {
        source: e.f207,
        txt: e.f207,
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f209, '.').concat(e.f208),
            target: '_blank',
          },
          e.f207,
        ),
        color: '',
        blink_html: t().createElement('span', {
          dangerouslySetInnerHTML: {
            __html: '<a href="//quote.eastmoney.com/unify/r/'
              .concat(e.f209, '.')
              .concat(e.f208, '" class="blinkblue">')
              .concat(e.f207, '</a>'),
          },
        }),
      };
    },
  }),
  (L[H.板块资金流入最大股] = {
    fid: ['f204', 'f205', 'f206'],
    value: function (e) {
      return {
        source: e.f204,
        txt: e.f204,
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f206, '.').concat(e.f205),
            target: '_blank',
          },
          e.f204,
        ),
        color: '',
        blink_html: t().createElement('span', {
          dangerouslySetInnerHTML: {
            __html: '<a href="//quote.eastmoney.com/unify/r/'
              .concat(e.f206, '.')
              .concat(e.f205, '" class="blinkblue">')
              .concat(e.f204, '</a>'),
          },
        }),
      };
    },
  }),
  (L[H.主力净额] = {
    fid: ['f62'],
    value: function (e) {
      return Y(e.f62, -1, e.f62, 4);
    },
  }),
  (L[H.买入价或买一价] = {
    fid: ['f31', 'f1'],
    value: function (e) {
      return Y(e.f31, e.f1, 0, -1);
    },
  }),
  (L[H.卖出价或卖一价] = {
    fid: ['f32', 'f1'],
    value: function (e) {
      return Y(e.f32, e.f1, 0, -1);
    },
  }),
  (L[H.交易时间] = {
    fid: ['f124'],
    value: function (e) {
      return {
        txt: Z(e.f124),
        html: t().createElement('span', null, Z(e.f124)),
        blink_html: t().createElement('span', null, Z(e.f124)),
        color: '',
        source: e.f124,
      };
    },
  }),
  (L[H.市盈率动态] = {
    fid: ['f9', 'f152'],
    value: function (e) {
      return Y(e.f9, e.f152, e.f9, -1);
    },
  }),
  (L[H.总市值] = {
    fid: ['f20'],
    value: function (e) {
      return Y(e.f20, -1, 0, 4);
    },
  }),
  (L[H.净资产] = {
    fid: ['f135'],
    value: function (e) {
      return 0 === e.f135 && (e.f135 = '-'), Y(e.f135, -1, 0, 4);
    },
  }),
  (L[H.净利润] = {
    fid: ['f45'],
    value: function (e) {
      return Y(e.f45, -1, 0, 4);
    },
  }),
  (L[H.净利率] = {
    fid: ['f129'],
    value: function (e) {
      return Y(e.f129, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.净利润TTM] = {
    fid: ['f138'],
    value: function (e) {
      return Y(e.f138, -1, 0, 4);
    },
  }),
  (L[H.总营业收入TTM] = {
    fid: ['f132'],
    value: function (e) {
      return Y(e.f132, -1, 0, 4);
    },
  }),
  (L[H.市销率TTM] = {
    fid: ['f130'],
    value: function (e) {
      return Y(e.f130, -1, 0, -1, void 0, 2);
    },
  }),
  (L[H.市现率TTM] = {
    fid: ['f131'],
    value: function (e) {
      return Y(e.f131, -1, 0, -1, void 0, 2);
    },
  }),
  (L[H.净资产收益率TTM] = {
    fid: ['f137'],
    value: function (e) {
      return Y(e.f137, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.股息率] = {
    fid: ['f133'],
    value: function (e) {
      return Y(e.f133, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.每股净资产] = {
    fid: ['f113'],
    value: function (e) {
      return Y(e.f113, -1, 0, 4, void 0, 2);
    },
  }),
  (L[H.市净率] = {
    fid: ['f23', 'f152'],
    value: function (e) {
      return Y(e.f23, e.f152, 0, -1);
    },
  }),
  (L[H.毛利率] = {
    fid: ['f49'],
    value: function (e) {
      return Y(e.f49, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.主力净流入] = {
    fid: ['f62'],
    value: function (e) {
      return Y(e.f62, -1, e.f62, 4);
    },
  }),
  (L[H.主力净占比] = {
    fid: ['f184', 'f152'],
    value: function (e) {
      return Y(e.f184, e.f152, e.f184, -1, '%');
    },
  }),
  (L[H.超大单净流入] = {
    fid: ['f66'],
    value: function (e) {
      return Y(e.f66, -1, e.f66, 4);
    },
  }),
  (L[H.超大单净占比] = {
    fid: ['f69', 'f152'],
    value: function (e) {
      return Y(e.f69, e.f152, e.f69, -1, '%');
    },
  }),
  (L[H.大单净流入] = {
    fid: ['f72'],
    value: function (e) {
      return Y(e.f72, -1, e.f72, 4);
    },
  }),
  (L[H.大单净占比] = {
    fid: ['f75', 'f152'],
    value: function (e) {
      return Y(e.f75, e.f152, e.f75, -1, '%');
    },
  }),
  (L[H.中单净流入] = {
    fid: ['f78'],
    value: function (e) {
      return Y(e.f78, -1, e.f78, 4);
    },
  }),
  (L[H.中单净占比] = {
    fid: ['f81', 'f152'],
    value: function (e) {
      return Y(e.f81, e.f152, e.f81, -1, '%');
    },
  }),
  (L[H.小单净流入] = {
    fid: ['f84'],
    value: function (e) {
      return Y(e.f84, -1, e.f84, 4);
    },
  }),
  (L[H.小单净占比] = {
    fid: ['f87', 'f152'],
    value: function (e) {
      return Y(e.f87, e.f152, e.f87, -1, '%');
    },
  }),
  (L[H['5日主力净额']] = {
    fid: ['f164'],
    value: function (e) {
      return Y(e.f164, -1, e.f164, 4);
    },
  }),
  (L[H['5日主力净占比']] = {
    fid: ['f165', 'f152'],
    value: function (e) {
      return Y(e.f165, e.f152, e.f165, -1, '%');
    },
  }),
  (L[H['5日超大单净额']] = {
    fid: ['f166'],
    value: function (e) {
      return Y(e.f166, -1, e.f166, 4);
    },
  }),
  (L[H['5日超大单净占比']] = {
    fid: ['f167', 'f152'],
    value: function (e) {
      return Y(e.f167, e.f152, e.f167, -1, '%');
    },
  }),
  (L[H['5日大单净额']] = {
    fid: ['f168'],
    value: function (e) {
      return Y(e.f168, -1, e.f168, 4);
    },
  }),
  (L[H['5日大单净占比']] = {
    fid: ['f169', 'f152'],
    value: function (e) {
      return Y(e.f169, e.f152, e.f169, -1, '%');
    },
  }),
  (L[H['5日中单净额']] = {
    fid: ['f170'],
    value: function (e) {
      return Y(e.f170, -1, e.f170, 4);
    },
  }),
  (L[H['5日中单净占比']] = {
    fid: ['f171', 'f152'],
    value: function (e) {
      return Y(e.f171, e.f152, e.f171, -1, '%');
    },
  }),
  (L[H['5日小单净额']] = {
    fid: ['f172'],
    value: function (e) {
      return Y(e.f172, -1, e.f172, 4);
    },
  }),
  (L[H['5日小单净占比']] = {
    fid: ['f173', 'f152'],
    value: function (e) {
      return Y(e.f173, e.f152, e.f173, -1, '%');
    },
  }),
  (L[H['10日主力净额']] = {
    fid: ['f174'],
    value: function (e) {
      return Y(e.f174, -1, e.f174, 4);
    },
  }),
  (L[H['10日主力净占比']] = {
    fid: ['f175', 'f152'],
    value: function (e) {
      return Y(e.f175, e.f152, e.f175, -1, '%');
    },
  }),
  (L[H['10日超大单净额']] = {
    fid: ['f176'],
    value: function (e) {
      return Y(e.f176, -1, e.f176, 4);
    },
  }),
  (L[H['10日超大单净占比']] = {
    fid: ['f177', 'f152'],
    value: function (e) {
      return Y(e.f177, e.f152, e.f177, -1, '%');
    },
  }),
  (L[H['10日大单净额']] = {
    fid: ['f178'],
    value: function (e) {
      return Y(e.f178, -1, e.f178, 4);
    },
  }),
  (L[H['10日大单净占比']] = {
    fid: ['f179', 'f152'],
    value: function (e) {
      return Y(e.f179, e.f152, e.f179, -1, '%');
    },
  }),
  (L[H['10日中单净额']] = {
    fid: ['f180'],
    value: function (e) {
      return Y(e.f180, -1, e.f180, 4);
    },
  }),
  (L[H['10日中单净占比']] = {
    fid: ['f181', 'f152'],
    value: function (e) {
      return Y(e.f181, e.f152, e.f181, -1, '%');
    },
  }),
  (L[H['10日小单净额']] = {
    fid: ['f182'],
    value: function (e) {
      return Y(e.f182, -1, e.f182, 4);
    },
  }),
  (L[H['10日小单净占比']] = {
    fid: ['f183', 'f152'],
    value: function (e) {
      return Y(e.f183, e.f152, e.f183, -1, '%');
    },
  }),
  (L[H.AB股对应的名称] = {
    fid: ['f203'],
    value: function (e) {
      return {
        txt: e.f203,
        html: t().createElement('span', null, e.f203),
        color: '',
        blink_html: t().createElement('span', null, e.f203),
        source: e.f203,
      };
    },
  }),
  (L[H.AB股对应的市场] = {
    fid: ['f202'],
    value: function (e) {
      return {
        txt: e.f202,
        source: e.f202,
        html: t().createElement('span', null, e.f202),
        blink_html: t().createElement('span', null, e.f202),
        color: '',
      };
    },
  }),
  (L[H.AB股对应的代码] = {
    fid: ['f201'],
    value: function (e) {
      return {
        txt: e.f201,
        html: t().createElement('span', null, e.f201),
        blink_html: t().createElement('span', null, e.f201),
        color: '',
        source: e.f201,
      };
    },
  }),
  (L[H.AB股对应的最新价] = {
    fid: ['f196', 'f200', 'f197'],
    value: function (e) {
      return Y(e.f196, e.f200, e.f197, -1);
    },
  }),
  (L[H.AB股对应的涨跌幅] = {
    fid: ['f197', 'f152'],
    value: function (e) {
      return Y(e.f197, e.f152, e.f197, -1, '%');
    },
  }),
  (L[H.AB股比价] = {
    fid: ['f199', 'f152'],
    value: function (e) {
      return Y(e.f199, e.f152, 0, -1);
    },
  }),
  (L[H.成交量] = {
    fid: ['f5'],
    value: function (e) {
      return Y(e.f5, -1, 0, 4);
    },
  }),
  (L[H.最高价] = {
    fid: ['f15', 'f1', 'f18'],
    value: function (e) {
      return Y(e.f15, e.f1, e.f15 - e.f18, -1);
    },
  }),
  (L[H.最低价] = {
    fid: ['f16', 'f1', 'f18'],
    value: function (e) {
      return Y(e.f16, e.f1, e.f16 - e.f18, -1);
    },
  }),
  (L[H.换手率] = {
    fid: ['f8', 'f152'],
    value: function (e) {
      return Y(e.f8, e.f152, 0, -1, '%');
    },
  }),
  (L[H.市盈率TTM] = {
    fid: ['f9', 'f152'],
    value: function (e) {
      return Y(e.f9, e.f152, 0, -1);
    },
  }),
  (L[H.股东权益] = {
    fid: ['f58'],
    value: function (e) {
      return Y(e.f58, -1, 0, 4);
    },
  }),
  (L[H.行业板块的成分股数] = {
    fid: ['f134'],
    value: function (e) {
      return Y(e.f134, -1, 0, -1);
    },
  }),
  (L[H.总市值行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1020, -1, 0, -1);
    },
  }),
  (L[H.净资产行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1135, -1, 0, -1);
    },
  }),
  (L[H.净利润行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1045, -1, 0, -1);
    },
  }),
  (L[H.净利润TTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1138, -1, 0, -1);
    },
  }),
  (L[H.市盈率动态行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1009, -1, 0, -1);
    },
  }),
  (L[H.市盈率TTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1115, -1, 0, -1);
    },
  }),
  (L[H.市净率行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1023, -1, 0, -1);
    },
  }),
  (L[H.毛利率行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1049, -1, 0, -1);
    },
  }),
  (L[H.净利率行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1129, -1, 0, -1);
    },
  }),
  (L[H.ROE行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1037, -1, 0, -1);
    },
  }),
  (L[H.ROETTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1137, -1, 0, -1);
    },
  }),
  (L[H.股东权益行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1058, -1, 0, -1);
    },
  }),
  (L[H.总营业收入TTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1132, -1, 0, -1);
    },
  }),
  (L[H.市销率TTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1130, -1, 0, -1);
    },
  }),
  (L[H.市现率TTM行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1131, -1, 0, -1);
    },
  }),
  (L[H.股息率行业排名] = {
    fid: ['f1000'],
    value: function (e) {
      return Y(e.f1133, -1, 0, -1);
    },
  }),
  (L[H.总市值行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3020, -1, 0, -1);
    },
  }),
  (L[H.净资产行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3135, -1, 0, -1);
    },
  }),
  (L[H.净利润行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3045, -1, 0, -1);
    },
  }),
  (L[H.净利润TTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3138, -1, 0, -1);
    },
  }),
  (L[H.市盈率动态行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3009, -1, 0, -1);
    },
  }),
  (L[H.市盈率TTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3115, -1, 0, -1);
    },
  }),
  (L[H.市净率行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3023, -1, 0, -1);
    },
  }),
  (L[H.毛利率行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3049, -1, 0, -1);
    },
  }),
  (L[H.净利率行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3129, -1, 0, -1);
    },
  }),
  (L[H.ROE行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3037, -1, 0, -1);
    },
  }),
  (L[H.ROETTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3137, -1, 0, -1);
    },
  }),
  (L[H.股东权益行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3058, -1, 0, -1);
    },
  }),
  (L[H.总营业收入TTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3132, -1, 0, -1);
    },
  }),
  (L[H.市销率TTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3130, -1, 0, -1);
    },
  }),
  (L[H.市现率TTM行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3131, -1, 0, -1);
    },
  }),
  (L[H.股息率行业排名四分位] = {
    fid: ['f3000'],
    value: function (e) {
      return Y(e.f3133, -1, 0, -1);
    },
  }),
  (L[H.期权行权价] = {
    fid: ['f161', 'f330'],
    value: function (e) {
      return Y(e.f161, e.f330, 0, -1);
    },
  }),
  (L[H.今持仓] = {
    fid: ['f108'],
    value: function (e) {
      return Y(e.f108, -1, 0, 4);
    },
  }),
  (L[H.期权隐含波动率] = {
    fid: ['f249', 'f152'],
    value: function (e) {
      return Y(e.f249, e.f152, 0, -1, '%');
    },
  }),
  (L[H.期权折溢价率] = {
    fid: ['f250', 'f152'],
    value: function (e) {
      return Y(e.f250, e.f152, 0, -1, '%');
    },
  }),
  (L[H.量比] = {
    fid: ['f10', 'f152'],
    value: function (e) {
      return Y(e.f10, e.f152, 0, -1);
    },
  }),
  (L[H.净资产收益率ROE] = {
    fid: ['f37'],
    value: function (e) {
      return Y(e.f37, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.总市值行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2020, -1, 0, 4);
    },
  }),
  (L[H.净资产行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2135, -1, 0, 4);
    },
  }),
  (L[H.净利润行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2045, -1, 0, 4);
    },
  }),
  (L[H.市盈率动态行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2009, -1, 0, 4);
    },
  }),
  (L[H.市净率行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2023, -1, 0, 4);
    },
  }),
  (L[H.毛利率行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2049, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.净利率行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2129, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.ROE行业平均] = {
    fid: ['f2000'],
    value: function (e) {
      return Y(e.f2037, -1, 0, -1, '%', 2);
    },
  }),
  (L[H.二级分类] = {
    fid: ['f19'],
    value: function (e) {
      return {
        txt: e.f19,
        html: t().createElement('span', null, e.f19),
        color: '',
        blink_html: t().createElement('span', null, e.f19),
        source: e.f19,
      };
    },
  }),
  L);

var V =
  (((G = {})[H.名称] = {
    fid: ['f58'],
    value: function (e) {
      return {
        txt: e.f58,
        html: t().createElement('span', null, e.f58),
        color: '',
        blink_html: t().createElement('span', null, e.f58),
        source: e.f58,
      };
    },
  }),
  (G[H.扩位简称] = {
    fid: ['f734'],
    value: function (e) {
      return {
        txt: e.f734,
        html: t().createElement('span', null, e.f734),
        color: '',
        blink_html: t().createElement('span', null, e.f734),
        source: e.f734,
      };
    },
  }),
  (G[H.市场] = {
    fid: ['f107'],
    value: function (e) {
      return {
        txt: e.f107,
        source: e.f107,
        html: t().createElement('span', null, e.f107),
        blink_html: t().createElement('span', null, e.f107),
        color: '',
      };
    },
  }),
  (G[H.代码] = {
    fid: ['f57'],
    value: function (e) {
      return {
        txt: e.f57,
        html: t().createElement('span', null, e.f57),
        blink_html: t().createElement('span', null, e.f57),
        color: '',
        source: e.f57,
      };
    },
  }),
  (G[H.行情代码] = {
    fid: ['f57', 'f107'],
    value: function (e) {
      return {
        txt: e.f57 + '.' + e.f107,
        source: e.f57 + '.' + e.f107,
        html: t().createElement('span', null, e.f57 + '.' + e.f107),
        blink_html: t().createElement('span', null, e.f57 + '.' + e.f107),
        color: '',
      };
    },
  }),
  (G[H.行情统一链接] = {
    fid: ['f57', 'f58', 'f107'],
    value: function (e) {
      return {
        txt: '//quote.eastmoney.com/unify/r/'.concat(e.f107, '.').concat(e.f57),
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f107, '.').concat(e.f57),
            target: '_blank',
          },
          e.f58,
        ),
        blink_html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/r/'.concat(e.f107, '.').concat(e.f57),
            target: '_blank',
          },
          e.f58,
        ),
        color: '',
        source: '',
      };
    },
  }),
  (G[H.行情统一概念版链接] = {
    fid: ['f57', 'f58', 'f107'],
    value: function (e) {
      return {
        txt: '//quote.eastmoney.com/unify/cr/'.concat(e.f107, '.').concat(e.f57),
        html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/cr/'.concat(e.f107, '.').concat(e.f57),
            target: '_blank',
          },
          e.f58,
        ),
        blink_html: t().createElement(
          'a',
          {
            href: '//quote.eastmoney.com/unify/cr/'.concat(e.f107, '.').concat(e.f57),
            target: '_blank',
          },
          '$',
          e.f58,
        ),
        color: '',
        source: '',
      };
    },
  }),
  (G[H.最新价] = {
    fid: ['f43', 'f59', 'f169'],
    value: function (e) {
      return Y(e.f43, e.f59, e.f169, -1);
    },
  }),
  (G[H.最后价格] = {
    fid: ['f301', 'f60', 'f43', 'f59'],
    value: function (e) {
      return 0 != e.f301
        ? Y(e.f301, e.f59, 0, -1)
        : 0 != e.f43
          ? Y(e.f43, e.f59, 0, -1)
          : Y(e.f60, e.f59, 0, -1);
    },
  }),
  (G[H.涨跌幅] = {
    fid: ['f170', 'f152', 'f169'],
    value: function (e) {
      return Y(e.f170, e.f152, e.f169, -1, '%');
    },
  }),
  (G[H.涨跌额] = {
    fid: ['f169', 'f59'],
    value: function (e) {
      return Y(e.f169, e.f59, e.f169, -1);
    },
  }),
  (G[H.今开] = {
    fid: ['f46', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f46, e.f59, e.f46 - e.f60, -1);
    },
  }),
  (G[H.股票期权今开] = {
    fid: ['f46', 'f59', 'f130'],
    value: function (e) {
      return Y(e.f46, e.f59, e.f46 - e.f130, -1);
    },
  }),
  (G[H.昨收] = {
    fid: ['f60', 'f59'],
    value: function (e) {
      return Y(e.f60, e.f59, 0, -1);
    },
  }),
  (G[H.最高价] = {
    fid: ['f44', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f44, e.f59, e.f44 - e.f60, -1);
    },
  }),
  (G[H.股票期权最高价] = {
    fid: ['f44', 'f59', 'f130'],
    value: function (e) {
      return Y(e.f44, e.f59, e.f44 - e.f130, -1);
    },
  }),
  (G[H.最低价] = {
    fid: ['f45', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f45, e.f59, e.f45 - e.f60, -1);
    },
  }),
  (G[H.股票期权最低价] = {
    fid: ['f45', 'f59', 'f130'],
    value: function (e) {
      return Y(e.f45, e.f59, e.f45 - e.f130, -1);
    },
  }),
  (G[H.成交量] = {
    fid: ['f47'],
    value: function (e) {
      return Y(e.f47, -1, 0, 4);
    },
  }),
  (G[H.盘后成交量] = {
    fid: ['f260'],
    value: function (e) {
      return Y(e.f260, -1, 0, 4);
    },
  }),
  (G[H.成交量带手] = {
    fid: ['f47'],
    value: function (e) {
      return Y(e.f47, -1, 0, 4, '手');
    },
  }),
  (G[H.成交额] = {
    fid: ['f48'],
    value: function (e) {
      return Y(e.f48, -1, 0, 4);
    },
  }),
  (G[H.盘后成交额] = {
    fid: ['f261'],
    value: function (e) {
      return Y(e.f261, -1, 0, 4);
    },
  }),
  (G[H.买入价或买一价] = {
    fid: ['f19', 'f59', 'f60', 'f532'],
    value: function (e) {
      return Y(e.f19, e.f59, e.f19 - e.f60, -1);
    },
  }),
  (G[H.卖出价或卖一价] = {
    fid: ['f39', 'f59', 'f60', 'f532'],
    value: function (e) {
      return Y(e.f39, e.f59, e.f39 - e.f60, -1);
    },
  }),
  (G[H.买一量] = {
    fid: ['f20', 'f532'],
    value: function (e) {
      return Y(e.f20, -1, 0, 4);
    },
  }),
  (G[H.卖一量] = {
    fid: ['f40', 'f532'],
    value: function (e) {
      return Y(e.f40, -1, 0, 4);
    },
  }),
  (G[H.买二价] = {
    fid: ['f17', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f17, e.f59, e.f17 - e.f60, -1);
    },
  }),
  (G[H.买二量] = {
    fid: ['f18', 'f531'],
    value: function (e) {
      return Y(e.f18, -1, 0, 4);
    },
  }),
  (G[H.买三价] = {
    fid: ['f15', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f15, e.f59, e.f15 - e.f60, -1);
    },
  }),
  (G[H.买三量] = {
    fid: ['f16', 'f531'],
    value: function (e) {
      return Y(e.f16, -1, 0, 4);
    },
  }),
  (G[H.买四价] = {
    fid: ['f13', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f13, e.f59, e.f13 - e.f60, -1);
    },
  }),
  (G[H.买四量] = {
    fid: ['f14', 'f531'],
    value: function (e) {
      return Y(e.f14, -1, 0, 4);
    },
  }),
  (G[H.买五价] = {
    fid: ['f11', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f11, e.f59, e.f11 - e.f60, -1);
    },
  }),
  (G[H.买五量] = {
    fid: ['f12', 'f531'],
    value: function (e) {
      return Y(e.f12, -1, 0, 4);
    },
  }),
  (G[H.卖二价] = {
    fid: ['f37', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f37, e.f59, e.f37 - e.f60, -1);
    },
  }),
  (G[H.卖二量] = {
    fid: ['f38', 'f531'],
    value: function (e) {
      return Y(e.f38, -1, 0, 4);
    },
  }),
  (G[H.卖三价] = {
    fid: ['f35', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f35, e.f59, e.f35 - e.f60, -1);
    },
  }),
  (G[H.卖三量] = {
    fid: ['f36', 'f531'],
    value: function (e) {
      return Y(e.f36, -1, 0, 4);
    },
  }),
  (G[H.卖四价] = {
    fid: ['f33', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f33, e.f59, e.f33 - e.f60, -1);
    },
  }),
  (G[H.卖四量] = {
    fid: ['f34', 'f531'],
    value: function (e) {
      return Y(e.f34, -1, 0, 4);
    },
  }),
  (G[H.卖五价] = {
    fid: ['f31', 'f59', 'f60', 'f531'],
    value: function (e) {
      return Y(e.f31, e.f59, e.f31 - e.f60, -1);
    },
  }),
  (G[H.卖五量] = {
    fid: ['f32', 'f531'],
    value: function (e) {
      return Y(e.f32, -1, 0, 4);
    },
  }),
  (G[H.买一差量] = {
    fid: ['f211'],
    value: function (e) {
      return (
        ('-' != e.f211 && 0 != e.f211 && null != e.f211) || (e.f211 = ''), Y(e.f211, -1, e.f211, 4)
      );
    },
  }),
  (G[H.买二差量] = {
    fid: ['f212'],
    value: function (e) {
      return (
        ('-' != e.f212 && 0 != e.f212 && null != e.f212) || (e.f212 = ''), Y(e.f212, -1, e.f212, 4)
      );
    },
  }),
  (G[H.买三差量] = {
    fid: ['f213'],
    value: function (e) {
      return (
        ('-' != e.f213 && 0 != e.f213 && null != e.f213) || (e.f213 = ''), Y(e.f213, -1, e.f213, 4)
      );
    },
  }),
  (G[H.买四差量] = {
    fid: ['f214'],
    value: function (e) {
      return (
        ('-' != e.f214 && 0 != e.f214 && null != e.f214) || (e.f214 = ''), Y(e.f214, -1, e.f214, 4)
      );
    },
  }),
  (G[H.买五差量] = {
    fid: ['f215'],
    value: function (e) {
      return (
        ('-' != e.f215 && 0 != e.f215 && null != e.f215) || (e.f215 = ''), Y(e.f215, -1, e.f215, 4)
      );
    },
  }),
  (G[H.卖一差量] = {
    fid: ['f210'],
    value: function (e) {
      return (
        ('-' != e.f210 && 0 != e.f210 && null != e.f210) || (e.f210 = ''), Y(e.f210, -1, e.f210, 4)
      );
    },
  }),
  (G[H.卖二差量] = {
    fid: ['f209'],
    value: function (e) {
      return (
        ('-' != e.f209 && 0 != e.f209 && null != e.f209) || (e.f209 = ''), Y(e.f209, -1, e.f209, 4)
      );
    },
  }),
  (G[H.卖三差量] = {
    fid: ['f208'],
    value: function (e) {
      return (
        ('-' != e.f208 && 0 != e.f208 && null != e.f208) || (e.f208 = ''), Y(e.f208, -1, e.f208, 4)
      );
    },
  }),
  (G[H.卖四差量] = {
    fid: ['f207'],
    value: function (e) {
      return (
        ('-' != e.f207 && 0 != e.f207 && null != e.f207) || (e.f207 = ''), Y(e.f207, -1, e.f207, 4)
      );
    },
  }),
  (G[H.卖五差量] = {
    fid: ['f206'],
    value: function (e) {
      return (
        ('-' != e.f206 && 0 != e.f206 && null != e.f206) || (e.f206 = ''), Y(e.f206, -1, e.f206, 4)
      );
    },
  }),
  (G[H.内盘] = {
    fid: ['f161'],
    value: function (e) {
      return Y(e.f161, -1, -1, 4);
    },
  }),
  (G[H.外盘] = {
    fid: ['f49'],
    value: function (e) {
      return Y(e.f49, -1, 1, 4);
    },
  }),
  (G[H.振幅] = {
    fid: ['f171', 'f152'],
    value: function (e) {
      return Y(e.f171, e.f152, 0, -1, '%');
    },
  }),
  (G[H.量比] = {
    fid: ['f50', 'f152'],
    value: function (e) {
      return Y(e.f50, e.f152, 0, -1);
    },
  }),
  (G[H.交易时间] = {
    fid: ['f86'],
    value: function (e) {
      return {
        txt: Z(e.f86),
        html: t().createElement('span', null, Z(e.f86)),
        blink_html: t().createElement('span', null, Z(e.f86)),
        color: '',
        source: e.f86,
      };
    },
  }),
  (G[H.交易时间不带括号] = {
    fid: ['f86'],
    value: function (e) {
      return {
        txt: Z(e.f86, !1, !1),
        html: t().createElement('span', null, Z(e.f86, !1, !1)),
        blink_html: t().createElement('span', null, Z(e.f86, !1, !1)),
        color: '',
        source: e.f86,
      };
    },
  }),
  (G[H.交易时间带星期] = {
    fid: ['f86'],
    value: function (e) {
      return {
        txt: Z(e.f86, !0),
        html: t().createElement('span', null, Z(e.f86, !0)),
        blink_html: t().createElement('span', null, Z(e.f86, !0)),
        color: '',
        source: e.f86,
      };
    },
  }),
  (G[H.交易币种] = {
    fid: ['f600'],
    value: function (e) {
      return {
        txt: e.f600,
        source: e.f600,
        html: t().createElement('span', null, e.f600),
        color: '',
        blink_html: t().createElement('span', null, e.f600),
      };
    },
  }),
  (G[H.交易币种_汇率] = {
    fid: ['f601', 'f154'],
    value: function (e) {
      return Y(e.f601, e.f154, 0, -1);
    },
  }),
  (G[H.总股本] = {
    fid: ['f84'],
    value: function (e) {
      return Y(e.f84, -1, 0, 4);
    },
  }),
  (G[H.流通股本] = {
    fid: ['f85'],
    value: function (e) {
      return Y(e.f85, -1, 0, 4);
    },
  }),
  (G[H.换手率] = {
    fid: ['f168', 'f152'],
    value: function (e) {
      return Y(e.f168, e.f152, 0, -1, '%');
    },
  }),
  (G[H.每股收益TTM] = {
    fid: ['f108'],
    value: function (e) {
      return Y(e.f108, -1, 0, 4, void 0, 2);
    },
  }),
  (G[H.总市值] = {
    fid: ['f116'],
    value: function (e) {
      return Y(e.f116, -1, 0, 4);
    },
  }),
  (G[H.总市值_短] = {
    fid: ['f116'],
    value: function (e) {
      return Y(e.f116, -1, 0, 2);
    },
  }),
  (G[H.流通市值] = {
    fid: ['f117'],
    value: function (e) {
      return Y(e.f117, -1, 0, 4);
    },
  }),
  (G[H.流通市值_短] = {
    fid: ['f117'],
    value: function (e) {
      return Y(e.f117, -1, 0, 2);
    },
  }),
  (G[H.市净率] = {
    fid: ['f167', 'f152'],
    value: function (e) {
      return Y(e.f167, e.f152, 0, -1);
    },
  }),
  (G[H.市盈率TTM] = {
    fid: ['f164', 'f152'],
    value: function (e) {
      return Y(e.f164, e.f152, 0, -1);
    },
  }),
  (G[H.市盈率动态] = {
    fid: ['f162', 'f152'],
    value: function (e) {
      return Y(e.f162, e.f152, 0, -1);
    },
  }),
  (G[H.市盈率静态] = {
    fid: ['f163', 'f152'],
    value: function (e) {
      return Y(e.f163, e.f152, 0, -1);
    },
  }),
  (G[H.均价] = {
    fid: ['f71', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f71, e.f59, e.f71 - e.f60, -1);
    },
  }),
  (G[H.股票期权均价] = {
    fid: ['f71', 'f59', 'f130'],
    value: function (e) {
      return Y(e.f71, e.f59, e.f71 - e.f130, -1);
    },
  }),
  (G[H.每股净资产] = {
    fid: ['f92', 'f59'],
    value: function (e) {
      return Y(e.f92, -1, 0, -1, void 0, e.f59);
    },
  }),
  (G[H.交易状态] = {
    fid: ['f292'],
    value: function (e) {
      return {
        txt: X(e.f292).txt,
        html: t().createElement('span', null, X(e.f292).txt),
        blink_html: t().createElement('span', null, X(e.f292).txt),
        color: X(e.f292).isopen ? 'price_up' : 'price_down',
        source: Z(e.f292),
      };
    },
  }),
  (G[H.异常交易状态] = {
    fid: ['f292'],
    value: function (e) {
      return {
        txt: W(e.f292),
        html: t().createElement('span', null, W(e.f292)),
        blink_html: t().createElement('span', null, W(e.f292)),
        color: W(e.f292) ? 'price_up' : 'price_down',
        source: W(e.f292),
      };
    },
  }),
  (G[H.JYS] = {
    fid: ['f112'],
    value: function (e) {
      return {
        txt: e.f112,
        html: t().createElement('span', null, e.f112),
        blink_html: t().createElement('span', null, e.f112),
        color: '',
        source: e.f112,
      };
    },
  }),
  (G[H.委比] = {
    fid: ['f191', 'f152'],
    value: function (e) {
      return Y(e.f191, e.f152, e.f191, -1, '%');
    },
  }),
  (G[H.委差] = {
    fid: ['f192'],
    value: function (e) {
      return Y(e.f192, -1, e.f192, 4);
    },
  }),
  (G[H.可转债名称或正股名称] = {
    fid: ['f264'],
    value: function (e) {
      return Y(e.f264, -1, 0, -1);
    },
  }),
  (G[H.可转债市场或正股市场] = {
    fid: ['f263'],
    value: function (e) {
      return Y(e.f263, -1, 0, -1);
    },
  }),
  (G[H.可转债代码或正股代码] = {
    fid: ['f262'],
    value: function (e) {
      return Y(e.f262, -1, 0, -1);
    },
  }),
  (G[H.可转债最新价或正股最新价] = {
    fid: ['f267', 'f265', 'f268'],
    value: function (e) {
      return Y(e.f267, e.f265, e.f268, -1);
    },
  }),
  (G[H.可转债涨跌额或正股涨跌额] = {
    fid: ['f267', 'f268', 'f152'],
    value: function (e) {
      var t = '-';
      if ('-' != e.f268 && '-' != e.f267) {
        var n = e.f268 / Math.pow(10, e.f152 + 2);
        t = (n * e.f267) / (1 + n);
      }
      return Y(t, e.f152, e.f268, -1);
    },
  }),
  (G[H.可转债涨跌幅或正股涨跌幅] = {
    fid: ['f268', 'f152'],
    value: function (e) {
      return Y(e.f268, e.f152, e.f268, -1, '%');
    },
  }),
  (G[H.可转债转股价] = {
    fid: ['f426', 'f265'],
    value: function (e) {
      return Y(e.f426, e.f265, 0, -1);
    },
  }),
  (G[H.可转债转股价值] = {
    fid: ['f427', 'f154'],
    value: function (e) {
      return Y(e.f427, e.f154, 0, -1);
    },
  }),
  (G[H.可转债申购代码] = {
    fid: ['f478'],
    value: function (e) {
      return Y(e.f478, -1, 0, -1);
    },
  }),
  (G[H.可转债申购日期] = {
    fid: ['f425'],
    value: function (e) {
      return Y(e.f425, -1, 0, -1);
    },
  }),
  (G[H.可转债转股日期] = {
    fid: ['f433'],
    value: function (e) {
      return (function (e) {
        if ('string' == typeof e && e.length >= 8)
          return {
            txt: e,
            color: '',
            html: t().createElement(t().Fragment, null),
            blink_html: t().createElement(t().Fragment, null),
            source: e,
          };
        return (
          (e = e.toString()),
          {
            txt: ''
              .concat(e.substring(0, 4), '-')
              .concat(e.substring(4, 6), '-')
              .concat(e.substring(6, 8)),
            color: '',
            html: t().createElement(t().Fragment, null),
            blink_html: t().createElement(t().Fragment, null),
            source: e,
          }
        );
      })(e.f433);
    },
  }),
  (G[H.可转债转股溢价率] = {
    fid: ['f428', 'f152'],
    value: function (e) {
      return Y(e.f428, e.f152, e.f428, -1, '%');
    },
  }),
  (G[H.可转债回售触发价] = {
    fid: ['f430', 'f265'],
    value: function (e) {
      return Y(e.f430, e.f265, 0, -1);
    },
  }),
  (G[H.可转债强赎触发价] = {
    fid: ['f431', 'f265'],
    value: function (e) {
      return Y(e.f431, e.f265, 0, -1);
    },
  }),
  (G[H.可转债到期赎回价] = {
    fid: ['f432', 'f265'],
    value: function (e) {
      return Y(e.f432, e.f265, 0, -1);
    },
  }),
  (G[H.纯债价值] = {
    fid: ['f424', 'f154'],
    value: function (e) {
      return Y(e.f424, e.f154, 0, -1);
    },
  }),
  (G[H.扩展类型] = {
    fid: ['f182'],
    value: function (e) {
      return Y(e.f182, -1, 0, -1);
    },
  }),
  (G[H.债券最近成交方式] = {
    fid: ['f706'],
    value: function (e) {
      return Y(
        (function (e) {
          var t = '-';
          switch (e) {
            case 1:
              t = '匹配成交';
              break;
            case 2:
              t = '协商成交';
              break;
            case 4:
              t = '点击成交';
              break;
            case 8:
              t = '意向申报';
              break;
            case 16:
              t = '询价成交';
              break;
            case 32:
              t = '竞买成交';
              break;
            case 64:
              t = '匹配成交大额';
          }
          return t;
        })(e.f706),
        -1,
        0,
        -1,
      );
    },
  }),
  (G[H.债券最新匹配成交价] = {
    fid: ['f700', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f700, e.f59, e.f700 - e.f60, -1);
    },
  }),
  (G[H.债券当日匹配成交量] = {
    fid: ['f701'],
    value: function (e) {
      return Y(e.f701, -1, 0, 4);
    },
  }),
  (G[H.债券最新YTM] = {
    fid: ['f703', 'f154'],
    value: function (e) {
      return Y(e.f703, e.f154, 0, -1, '%', 0, 2);
    },
  }),
  (G[H.质押式回购债券涨跌BP] = {
    fid: ['f169', 'f59'],
    value: function (e) {
      var t = e.f169;
      return 'number' == typeof t && (t *= 100), Y(t, e.f59, 0, -1, '', 0, 2);
    },
  }),
  (G[H.债券涨跌BP] = {
    fid: ['f704', 'f152'],
    value: function (e) {
      var t = e.f704;
      return 'number' == typeof t && (t /= 100), Y(t, e.f152, 0, -1);
    },
  }),
  (G[H.债券当日匹配成交额] = {
    fid: ['f702'],
    value: function (e) {
      return Y(e.f702, -1, 0, 4);
    },
  }),
  (G[H.债券加权平均涨跌BP] = {
    fid: ['f705', 'f152'],
    value: function (e) {
      return Y(e.f705, e.f152, 0, -1);
    },
  }),
  (G[H.债券加权平均] = {
    fid: ['f71', 'f59'],
    value: function (e) {
      return Y(e.f71, e.f59, 0, -1);
    },
  }),
  (G[H.债券昨加权平均] = {
    fid: ['f721', 'f59'],
    value: function (e) {
      return Y(e.f721, e.f59, 0, -1);
    },
  }),
  (G[H.涨跌幅_5日] = {
    fid: ['f119', 'f152'],
    value: function (e) {
      return Y(e.f119, e.f152, e.f119, -1, '%');
    },
  }),
  (G[H.涨跌幅_10日] = {
    fid: ['f291', 'f152'],
    value: function (e) {
      return Y(e.f291, e.f152, e.f291, -1, '%');
    },
  }),
  (G[H.涨跌幅_20日] = {
    fid: ['f120', 'f152'],
    value: function (e) {
      return Y(e.f120, e.f152, e.f120, -1, '%');
    },
  }),
  (G[H.涨跌幅_60日] = {
    fid: ['f121', 'f152'],
    value: function (e) {
      return Y(e.f121, e.f152, e.f121, -1, '%');
    },
  }),
  (G[H.涨跌幅_今年以来] = {
    fid: ['f122', 'f152'],
    value: function (e) {
      return Y(e.f122, e.f152, e.f122, -1, '%');
    },
  }),
  (G[H.营业总收入] = {
    fid: ['f183'],
    value: function (e) {
      return Y(e.f183, -1, 0, 4);
    },
  }),
  (G[H.营业总收入同比] = {
    fid: ['f184'],
    value: function (e) {
      return Y(e.f184, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.净利润] = {
    fid: ['f105'],
    value: function (e) {
      return Y(e.f105, -1, 0, 4);
    },
  }),
  (G[H.净利润同比] = {
    fid: ['f185'],
    value: function (e) {
      return Y(e.f185, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.毛利率] = {
    fid: ['f186'],
    value: function (e) {
      return Y(e.f186, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.净利率] = {
    fid: ['f187'],
    value: function (e) {
      return Y(e.f187, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.净资产收益率ROE] = {
    fid: ['f173'],
    value: function (e) {
      return Y(e.f173, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.资产负债率] = {
    fid: ['f188'],
    value: function (e) {
      return Y(e.f188, -1, 0, -1, '%', 2);
    },
  }),
  (G[H.每股未分配利润] = {
    fid: ['f190'],
    value: function (e) {
      return Y(e.f190, -1, 0, 4);
    },
  }),
  (G[H.上市日期] = {
    fid: ['f189'],
    value: function (e) {
      return {
        txt: J(e.f189),
        html: t().createElement('span', null, J(e.f189)),
        blink_html: t().createElement('span', null, J(e.f189)),
        color: '',
        source: e.f189,
      };
    },
  }),
  (G[H.财报季度] = {
    fid: ['f62'],
    value: function (e) {
      return {
        txt: Q(e.f62),
        html: t().createElement('span', null, Q(e.f62)),
        blink_html: t().createElement('span', null, Q(e.f62)),
        color: '',
        source: e.f62,
      };
    },
  }),
  (G[H.每股收益] = {
    fid: ['f55'],
    value: function (e) {
      return Y(e.f55, -1, 0, 4);
    },
  }),
  (G[H.涨停价] = {
    fid: ['f51', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f51, e.f59, e.f51 - e.f60, -1);
    },
  }),
  (G[H.跌停价] = {
    fid: ['f52', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f52, e.f59, e.f52 - e.f60, -1);
    },
  }),
  (G[H.主力流入] = {
    fid: ['f135'],
    value: function (e) {
      return Y(e.f135, -1, 1, 4);
    },
  }),
  (G[H.主力流出] = {
    fid: ['f136'],
    value: function (e) {
      return Y(e.f136, -1, -1, 4);
    },
  }),
  (G[H.主力净流入] = {
    fid: ['f137'],
    value: function (e) {
      return Y(e.f137, -1, e.f137, 4);
    },
  }),
  (G[H.主力净占比] = {
    fid: ['f193', 'f152'],
    value: function (e) {
      return Y(e.f193, e.f152, e.f193, -1, '%');
    },
  }),
  (G[H.超大单流入] = {
    fid: ['f138'],
    value: function (e) {
      return Y(e.f138, -1, 1, 4);
    },
  }),
  (G[H.超大单流出] = {
    fid: ['f139'],
    value: function (e) {
      return Y(e.f139, -1, -1, 4);
    },
  }),
  (G[H.超大单净占比] = {
    fid: ['f194', 'f152'],
    value: function (e) {
      return Y(e.f194, e.f152, e.f194, -1, '%');
    },
  }),
  (G[H.超大单净流入] = {
    fid: ['f140'],
    value: function (e) {
      return Y(e.f140, -1, e.f140, 4);
    },
  }),
  (G[H.大单流入] = {
    fid: ['f141'],
    value: function (e) {
      return Y(e.f141, -1, 1, 4);
    },
  }),
  (G[H.大单流出] = {
    fid: ['f142'],
    value: function (e) {
      return Y(e.f142, -1, -1, 4);
    },
  }),
  (G[H.大单净流入] = {
    fid: ['f143'],
    value: function (e) {
      return Y(e.f143, -1, e.f143, 4);
    },
  }),
  (G[H.大单净占比] = {
    fid: ['f195', 'f152'],
    value: function (e) {
      return Y(e.f195, e.f152, e.f195, -1, '%');
    },
  }),
  (G[H.中单流入] = {
    fid: ['f144'],
    value: function (e) {
      return Y(e.f144, -1, 1, 4);
    },
  }),
  (G[H.中单流出] = {
    fid: ['f145'],
    value: function (e) {
      return Y(e.f145, -1, -1, 4);
    },
  }),
  (G[H.中单净流入] = {
    fid: ['f146'],
    value: function (e) {
      return Y(e.f146, -1, e.f146, 4);
    },
  }),
  (G[H.中单净占比] = {
    fid: ['f196', 'f152'],
    value: function (e) {
      return Y(e.f196, e.f152, e.f196, -1, '%');
    },
  }),
  (G[H.小单流入] = {
    fid: ['f147'],
    value: function (e) {
      return Y(e.f147, -1, 1, 4);
    },
  }),
  (G[H.小单流出] = {
    fid: ['f148'],
    value: function (e) {
      return Y(e.f148, -1, -1, 4);
    },
  }),
  (G[H.小单净流入] = {
    fid: ['f149'],
    value: function (e) {
      return Y(e.f149, -1, e.f149, 4);
    },
  }),
  (G[H.小单净占比] = {
    fid: ['f197', 'f152'],
    value: function (e) {
      return Y(e.f197, e.f152, e.f197, -1, '%');
    },
  }),
  (G[H.上涨家数] = {
    fid: ['f113'],
    value: function (e) {
      return Y(e.f113, -1, 1, -1);
    },
  }),
  (G[H.下跌家数] = {
    fid: ['f114'],
    value: function (e) {
      return Y(e.f114, -1, -1, -1);
    },
  }),
  (G[H.平盘家数] = {
    fid: ['f115'],
    value: function (e) {
      return Y(e.f115, -1, 0, -1);
    },
  }),
  (G[H['52周最高价']] = {
    fid: ['f174', 'f59', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f174, e.f59, e.f174 - e.f60, -1);
    },
  }),
  (G[H['52周最低价']] = {
    fid: ['f175', 'f59', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f175, e.f59, e.f175 - e.f60, -1);
    },
  }),
  (G[H.AB股对应的名称] = {
    fid: ['f271'],
    value: function (e) {
      return {
        txt: e.f271,
        html: t().createElement('span', null, e.f271),
        color: '',
        blink_html: t().createElement('span', null, e.f271),
        source: e.f271,
      };
    },
  }),
  (G[H.AB股对应的市场] = {
    fid: ['f270'],
    value: function (e) {
      return {
        txt: e.f270,
        source: e.f270,
        html: t().createElement('span', null, e.f270),
        blink_html: t().createElement('span', null, e.f270),
        color: '',
      };
    },
  }),
  (G[H.AB股对应的代码] = {
    fid: ['f269'],
    value: function (e) {
      return {
        txt: e.f269,
        html: t().createElement('span', null, e.f269),
        blink_html: t().createElement('span', null, e.f269),
        color: '',
        source: e.f269,
      };
    },
  }),
  (G[H.AB股比价] = {
    fid: ['f276', 'f152'],
    value: function (e) {
      return Y(e.f276, e.f152, 0, -1);
    },
  }),
  (G[H.A瑞士对应的名称] = {
    fid: ['f749'],
    value: function (e) {
      return {
        txt: e.f749,
        html: t().createElement('span', null, e.f749),
        color: '',
        blink_html: t().createElement('span', null, e.f749),
        source: e.f749,
      };
    },
  }),
  (G[H.A瑞士对应的市场] = {
    fid: ['f748'],
    value: function (e) {
      return {
        txt: e.f748,
        source: e.f748,
        html: t().createElement('span', null, e.f748),
        blink_html: t().createElement('span', null, e.f748),
        color: '',
      };
    },
  }),
  (G[H.A瑞士对应的代码] = {
    fid: ['f747'],
    value: function (e) {
      return {
        txt: e.f747,
        html: t().createElement('span', null, e.f747),
        blink_html: t().createElement('span', null, e.f747),
        color: '',
        source: e.f747,
      };
    },
  }),
  (G[H.A瑞士比价] = {
    fid: ['f750', 'f152'],
    value: function (e) {
      return Y(e.f750, e.f152, 0, -1);
    },
  }),
  (G[H.A瑞士溢价率] = {
    fid: ['f745', 'f152'],
    value: function (e) {
      return Y(e.f745, e.f152, 0, -1);
    },
  }),
  (G[H.A瑞士对应的最新价] = {
    fid: ['f743', 'f746', 'f744'],
    value: function (e) {
      return Y(e.f743, e.f746, e.f744, -1);
    },
  }),
  (G[H.A瑞士对应的涨跌幅] = {
    fid: ['f744', 'f152'],
    value: function (e) {
      return Y(e.f744, e.f152, e.f744, -1, '%');
    },
  }),
  (G[H.现手] = {
    fid: ['f452'],
    value: function (e) {
      return isNaN(e.f452) ? Y('-', -1, 0, 4) : Y(Math.abs(e.f452), -1, e.f452, 4);
    },
  }),
  (G[H.股票标识] = {
    fid: ['f177'],
    value: function (e) {
      return {
        txt: e.f177,
        html: t().createElement('span', null, e.f177),
        color: '',
        blink_html: t().createElement('span', null, e.f177),
        source: e.f177,
      };
    },
  }),
  (G[H.二级分类] = {
    fid: ['f111'],
    value: function (e) {
      return {
        txt: e.f111,
        html: t().createElement('span', null, e.f111),
        color: '',
        blink_html: t().createElement('span', null, e.f111),
        source: e.f111,
      };
    },
  }),
  (G[H.相对大盘指数1月涨跌幅] = {
    fid: ['f123', 'f152'],
    value: function (e) {
      return Y(e.f123, e.f152, 0, -1, '%');
    },
  }),
  (G[H.相对大盘指数3月涨跌幅] = {
    fid: ['f124', 'f152'],
    value: function (e) {
      return Y(e.f124, e.f152, 0, -1, '%');
    },
  }),
  (G[H.相对大盘指数52周涨跌幅] = {
    fid: ['f125', 'f152'],
    value: function (e) {
      return Y(e.f125, e.f152, 0, -1, '%');
    },
  }),
  (G[H.股息率] = {
    fid: ['f126'],
    value: function (e) {
      return Y(e.f126, -1, 0, -1, '%');
    },
  }),
  (G[H.AH股对应的市场] = {
    fid: ['f257'],
    value: function (e) {
      return {
        txt: e.f257,
        source: e.f257,
        html: t().createElement('span', null, e.f257),
        blink_html: t().createElement('span', null, e.f257),
        color: '',
      };
    },
  }),
  (G[H.AH股对应的代码] = {
    fid: ['f256'],
    value: function (e) {
      return {
        txt: e.f256,
        html: t().createElement('span', null, e.f256),
        blink_html: t().createElement('span', null, e.f256),
        color: '',
        source: e.f256,
      };
    },
  }),
  (G[H.AH股对应的名称] = {
    fid: ['f258'],
    value: function (e) {
      return {
        txt: e.f258,
        html: t().createElement('span', null, e.f258),
        blink_html: t().createElement('span', null, e.f258),
        color: '',
        source: e.f258,
      };
    },
  }),
  (G[H.AH股对应的最新价] = {
    fid: ['f251', 'f255', 'f252'],
    value: function (e) {
      return Y(e.f251, e.f255, e.f252, -1);
    },
  }),
  (G[H.AH股对应的涨跌幅] = {
    fid: ['f252', 'f152'],
    value: function (e) {
      return Y(e.f252, e.f152, e.f252, -1, '%');
    },
  }),
  (G[H.AH股对应的比价] = {
    fid: ['f254', 'f152'],
    value: function (e) {
      return Y(e.f254, e.f152, 0, -1);
    },
  }),
  (G[H.AH股对应的溢价率] = {
    fid: ['f253', 'f152'],
    value: function (e) {
      return Y(e.f253, e.f152, e.f253, -1, '%');
    },
  }),
  (G[H.A股对应GDR或GDR对应A股的市场] = {
    fid: ['f286'],
    value: function (e) {
      return {
        txt: e.f286,
        source: e.f286,
        html: t().createElement('span', null, e.f286),
        blink_html: t().createElement('span', null, e.f286),
        color: '',
      };
    },
  }),
  (G[H.A股对应GDR或GDR对应A股的代码] = {
    fid: ['f285'],
    value: function (e) {
      return {
        txt: e.f285,
        html: t().createElement('span', null, e.f285),
        blink_html: t().createElement('span', null, e.f285),
        color: '',
        source: e.f285,
      };
    },
  }),
  (G[H.A股对应GDR或GDR对应A股的名称] = {
    fid: ['f287'],
    value: function (e) {
      return {
        txt: e.f287,
        html: t().createElement('span', null, e.f287),
        blink_html: t().createElement('span', null, e.f287),
        color: '',
        source: e.f287,
      };
    },
  }),
  (G[H.所属行业板块市场] = {
    fid: ['f199'],
    value: function (e) {
      return {
        txt: e.f199,
        source: e.f199,
        html: t().createElement('span', null, e.f199),
        blink_html: t().createElement('span', null, e.f199),
        color: '',
      };
    },
  }),
  (G[H.所属行业板块代码] = {
    fid: ['f198'],
    value: function (e) {
      return {
        txt: e.f198,
        html: t().createElement('span', null, e.f198),
        blink_html: t().createElement('span', null, e.f198),
        color: '',
        source: e.f198,
      };
    },
  }),
  (G[H.卖十价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f21, e.f59, e.f21 - e.f60, -1);
    },
  }),
  (G[H.卖九价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f23, e.f59, e.f23 - e.f60, -1);
    },
  }),
  (G[H.卖八价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f25, e.f59, e.f25 - e.f60, -1);
    },
  }),
  (G[H.卖七价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f27, e.f59, e.f27 - e.f60, -1);
    },
  }),
  (G[H.卖六价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f29, e.f59, e.f29 - e.f60, -1);
    },
  }),
  (G[H.买十价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f1, e.f59, e.f1 - e.f60, -1);
    },
  }),
  (G[H.买九价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f3, e.f59, e.f3 - e.f60, -1);
    },
  }),
  (G[H.买八价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f5, e.f59, e.f5 - e.f60, -1);
    },
  }),
  (G[H.买七价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f7, e.f59, e.f7 - e.f60, -1);
    },
  }),
  (G[H.买六价] = {
    fid: ['f530', 'f59', 'f60'],
    value: function (e) {
      return Y(e.f9, e.f59, e.f9 - e.f60, -1);
    },
  }),
  (G[H.卖十量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f22, -1, 0, 4);
    },
  }),
  (G[H.卖九量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f24, -1, 0, 4);
    },
  }),
  (G[H.卖八量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f26, -1, 0, 4);
    },
  }),
  (G[H.卖七量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f28, -1, 0, 4);
    },
  }),
  (G[H.卖六量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f30, -1, 0, 4);
    },
  }),
  (G[H.买十量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f2, -1, 0, 4);
    },
  }),
  (G[H.买九量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f4, -1, 0, 4);
    },
  }),
  (G[H.买八量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f6, -1, 0, 4);
    },
  }),
  (G[H.买七量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f8, -1, 0, 4);
    },
  }),
  (G[H.买六量] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f10, -1, 0, 4);
    },
  }),
  (G[H.卖十席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f221, -1, 0, 4);
    },
  }),
  (G[H.卖九席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f222, -1, 0, 4);
    },
  }),
  (G[H.卖八席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f223, -1, 0, 4);
    },
  }),
  (G[H.卖七席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f224, -1, 0, 4);
    },
  }),
  (G[H.卖六席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f225, -1, 0, 4);
    },
  }),
  (G[H.卖五席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f226, -1, 0, 4);
    },
  }),
  (G[H.卖四席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f227, -1, 0, 4);
    },
  }),
  (G[H.卖三席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f228, -1, 0, 4);
    },
  }),
  (G[H.卖二席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f229, -1, 0, 4);
    },
  }),
  (G[H.卖一席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f230, -1, 0, 4);
    },
  }),
  (G[H.买十席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f240, -1, 0, 4);
    },
  }),
  (G[H.买九席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f239, -1, 0, 4);
    },
  }),
  (G[H.买八席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f238, -1, 0, 4);
    },
  }),
  (G[H.买七席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f237, -1, 0, 4);
    },
  }),
  (G[H.买六席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f236, -1, 0, 4);
    },
  }),
  (G[H.买五席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f235, -1, 0, 4);
    },
  }),
  (G[H.买四席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f234, -1, 0, 4);
    },
  }),
  (G[H.买三席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f233, -1, 0, 4);
    },
  }),
  (G[H.买二席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f232, -1, 0, 4);
    },
  }),
  (G[H.买一席位数] = {
    fid: ['f530'],
    value: function (e) {
      return Y(e.f231, -1, 0, 4);
    },
  }),
  (G[H.期权隐含波动率] = {
    fid: ['f412', 'f152'],
    value: function (e) {
      return Y(e.f412, e.f152, 0, -1, '%');
    },
  }),
  (G[H.期权折溢价率] = {
    fid: ['f413', 'f152'],
    value: function (e) {
      return Y(e.f413, e.f152, 0, -1, '%');
    },
  }),
  (G[H.期权剩余日期] = {
    fid: ['f407'],
    value: function (e) {
      return Y(e.f407, -1, 0, -1);
    },
  }),
  (G[H.期权内在价值] = {
    fid: ['f411', 'f59'],
    value: function (e) {
      return Y(e.f411, e.f59, 0, -1);
    },
  }),
  (G[H.期权购沽对应的证券名称] = {
    fid: ['f406'],
    value: function (e) {
      return Y(e.f406, -1, 0, -1);
    },
  }),
  (G[H.期权购沽对应的市场] = {
    fid: ['f405'],
    value: function (e) {
      return Y(e.f405, -1, 0, -1);
    },
  }),
  (G[H.期权购沽对应的代码] = {
    fid: ['f404'],
    value: function (e) {
      return Y(e.f404, -1, 0, -1);
    },
  }),
  (G[H.昨结算] = {
    fid: ['f130', 'f59'],
    value: function (e) {
      return Y(e.f130, e.f59, 0, -1);
    },
  }),
  (G[H.今结算] = {
    fid: ['f131', 'f59'],
    value: function (e) {
      return Y(e.f131, e.f59, 0, -1);
    },
  }),
  (G[H.今持仓] = {
    fid: ['f133'],
    value: function (e) {
      return Y(e.f133, -1, 0, 4);
    },
  }),
  (G[H.昨持仓] = {
    fid: ['f132'],
    value: function (e) {
      return Y(e.f132, -1, 0, 4);
    },
  }),
  (G[H.期权购沽对应的最新价] = {
    fid: ['f401', 'f403', 'f402'],
    value: function (e) {
      return Y(e.f401, e.f403, e.f402, -1);
    },
  }),
  (G[H.期权购沽对应的涨跌幅] = {
    fid: ['f402', 'f152'],
    value: function (e) {
      return Y(e.f402, e.f152, e.f402, -1, '%');
    },
  }),
  (G[H.期权合约单位] = {
    fid: ['f408'],
    value: function (e) {
      return Y(e.f408, -1, 0, -1);
    },
  }),
  (G[H.期权行权价] = {
    fid: ['f410', 'f481'],
    value: function (e) {
      return Y(e.f410, e.f481, 0, -1);
    },
  }),
  (G[H.期权到期日] = {
    fid: ['f409'],
    value: function (e) {
      var n = e.f409.toString();
      if (n.length > 7) {
        var a = n.substring(0, 4);
        n =
          a == new Date().getFullYear().toString()
            ? n.substring(4, 6) + '-' + n.substring(6, 8)
            : n.substring(0, 4) + '-' + n.substring(4, 6) + '-' + n.substring(6, 8);
      }
      return {
        txt: n,
        html: t().createElement('span', null, n),
        color: '',
        blink_html: t().createElement(t().Fragment, null),
        source: e.f409,
      };
    },
  }),
  (G[H.期权Delta] = {
    fid: ['f414', 'f154'],
    value: function (e) {
      return Y(e.f414, e.f154, 0, -1);
    },
  }),
  (G[H.期权Gamma] = {
    fid: ['f415', 'f154'],
    value: function (e) {
      return Y(e.f415, e.f154, 0, -1);
    },
  }),
  (G[H.期权Vega] = {
    fid: ['f416', 'f154'],
    value: function (e) {
      return Y(e.f416, e.f154, 0, -1);
    },
  }),
  (G[H.期权Theta] = {
    fid: ['f417', 'f154'],
    value: function (e) {
      return Y(e.f417, e.f154, 0, -1);
    },
  }),
  (G[H.期权Rho] = {
    fid: ['f418', 'f154'],
    value: function (e) {
      return Y(e.f418, e.f154, 0, -1);
    },
  }),
  (G[H['30日波动率']] = {
    fid: ['f419', 'f152'],
    value: function (e) {
      return Y(e.f419, e.f152, 0, -1, '%');
    },
  }),
  (G[H['60日波动率']] = {
    fid: ['f420', 'f152'],
    value: function (e) {
      return Y(e.f420, e.f152, 0, -1, '%');
    },
  }),
  (G[H['120日波动率']] = {
    fid: ['f421', 'f152'],
    value: function (e) {
      return Y(e.f421, e.f152, 0, -1, '%');
    },
  }),
  (G[H['240日波动率']] = {
    fid: ['f422', 'f152'],
    value: function (e) {
      return Y(e.f422, e.f152, 0, -1, '%');
    },
  }),
  (G[H.仓差] = {
    fid: ['f134'],
    value: function (e) {
      return Y(e.f134, -1, 0, 4);
    },
  }),
  (G[H.注册股本] = {
    fid: ['f277'],
    value: function (e) {
      return Y(e.f277, -1, 0, 4);
    },
  }),
  (G[H.发行股本] = {
    fid: ['f278'],
    value: function (e) {
      return Y(e.f278, -1, 0, 4);
    },
  }),
  (G[H.成交笔数] = {
    fid: ['f296'],
    value: function (e) {
      return Y(e.f296, -1, 0, 4);
    },
  }),
  (G[H.是否同股同权] = {
    fid: ['f279'],
    value: function (e) {
      var n = '-';
      return (
        1 == e.f279 ? (n = '是') : 0 == e.f279 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f279,
        }
      );
    },
  }),
  (G[H.是否表决权差异] = {
    fid: ['f279'],
    value: function (e) {
      var n = '-';
      return (
        0 == e.f279 ? (n = '是') : 1 == e.f279 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f279,
        }
      );
    },
  }),
  (G[H.是否尚未盈利] = {
    fid: ['f288'],
    value: function (e) {
      var n = '-';
      return (
        1 == e.f288 ? (n = '是') : 0 == e.f288 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f288,
        }
      );
    },
  }),
  (G[H.是否盈利] = {
    fid: ['f288'],
    value: function (e) {
      var n = '-';
      return (
        0 == e.f288 ? (n = '是') : 1 == e.f288 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f288,
        }
      );
    },
  }),
  (G[H.是否注册制] = {
    fid: ['f294'],
    value: function (e) {
      var n = '-';
      return (
        1 == e.f294 ? (n = '是') : 0 == e.f294 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f294,
        }
      );
    },
  }),
  (G[H.是否具有协议控制架构] = {
    fid: ['f295'],
    value: function (e) {
      var n = '-';
      return (
        1 == e.f295 ? (n = '是') : 0 == e.f295 && (n = '否'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f295,
        }
      );
    },
  }),
  (G[H.做市商数] = {
    fid: ['f740'],
    value: function (e) {
      var n = '-';
      return (
        null != e.f740 && (n = e.f740.toString()),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: e.f740,
        }
      );
    },
  }),
  (G[H.港股对应人民币计价或者反过来对应的市场] = {
    fid: ['f752'],
    value: function (e) {
      return {
        txt: e.f752,
        source: e.f752,
        html: t().createElement('span', null, e.f752),
        blink_html: t().createElement('span', null, e.f752),
        color: '',
      };
    },
  }),
  (G[H.港股对应人民币计价或者反过来对应的代码] = {
    fid: ['f751'],
    value: function (e) {
      return {
        txt: e.f751,
        html: t().createElement('span', null, e.f751),
        blink_html: t().createElement('span', null, e.f751),
        color: '',
        source: e.f751,
      };
    },
  }),
  (G[H.关键期国债价差] = {
    fid: ['f19', 'f39', 'f59'],
    value: function (e) {
      if ('number' != typeof e.f19 || 'number' != typeof e.f39)
        return {
          txt: '-',
          html: t().createElement(t().Fragment, null, '-'),
          blink_html: t().createElement(t().Fragment, null, '-'),
          color: '',
          source: '',
        };
      var n = (e.f19 - e.f39) / Math.pow(10, e.f59),
        a = (100 * n).toFixed(e.f59 - 2) + 'BP';
      return {
        txt: a,
        html: t().createElement('span', null, a),
        blink_html: t().createElement('span', null, a),
        color: '',
        source: n,
      };
    },
  }),
  (G[H.关键期国债期限] = {
    fid: ['f754'],
    value: function (e) {
      return {
        txt: e.f754,
        html: t().createElement('span', null, e.f754),
        color: '',
        blink_html: t().createElement('span', null, e.f754),
        source: e.f754,
      };
    },
  }),
  (G[H.关键期国债国家] = {
    fid: ['f753', 'f759'],
    value: function (e) {
      var n = e.f759;
      return (
        null == n &&
          (n = null == (n = e.f753) ? '-' : 'US' == n ? '美国' : 'CN' == n ? '中国' : '-'),
        {
          txt: n,
          html: t().createElement('span', null, n),
          color: '',
          blink_html: t().createElement('span', null, n),
          source: n,
        }
      );
    },
  }),
  G);

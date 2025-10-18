export const getSpacing = (s: any) => {
  if (!(s in CSpacing)) {
    throw new TypeError('s must be of enum Spacing');
  }
  const spacing = CSpacing[s];
  return spacing !== undefined ? spacing : CSpacing.zero;
};

export const destructureLayoutProps = (props: any) => {
  const {
    padding = 'zero',
    paddingH = 'zero',
    paddingV = 'zero',
    paddingT = 'zero',
    paddingR = 'zero',
    paddingB = 'zero',
    paddingL = 'zero',
    margin = 'zero',
    marginH = 'zero',
    marginV = 'zero',
    marginT = 'zero',
    marginR = 'zero',
    marginB = 'zero',
    marginL = 'zero',
  } = props || {};
  const layout: any = {
    padding,
    paddingH,
    paddingV,
    paddingT,
    paddingR,
    paddingB,
    paddingL,
    margin,
    marginH,
    marginV,
    marginT,
    marginR,
    marginB,
    marginL,
  };
  Object.keys(layout).forEach(key =>
    layout[key] === undefined ? delete layout[key] : layout[key],
  );
  const result: any = {
    padding: getSpacing(padding),
    paddingHorizontal: getSpacing(paddingH),
    paddingVertical: getSpacing(paddingV),
    paddingTop: getSpacing(paddingT),
    paddingRight: getSpacing(paddingR),
    paddingBottom: getSpacing(paddingB),
    paddingLeft: getSpacing(paddingL),
    margin: getSpacing(margin),
    marginHorizontal: getSpacing(marginH),
    marginVertical: getSpacing(marginV),
    marginTop: getSpacing(marginT),
    marginRight: getSpacing(marginR),
    marginBottom: getSpacing(marginB),
    marginLeft: getSpacing(marginL),
  };
  Object.keys(result).forEach(key =>
    !result[key] ? delete result[key] : result[key],
  );
  return result;
};

export type SpacingType = keyof typeof CSpacing;

enum CSpacing {
  zero = 0,
  xxs = 2,
  xs = 4,
  s = 8,
  m = 12,
  l = 16,
  xl = 20,
  xxl = 24,
  s29 = 29,
}

export default CSpacing;

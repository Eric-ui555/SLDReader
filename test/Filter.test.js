/* global describe it expect */
import { filterSelector, scaleSelector } from '../src/Filter';

describe.only('filter rules', () => {
  describe('FID filter', () => {
    const filter = {
      type: 'featureid',
      fids: ['tasmania_water_bodies.2', 'tasmania_water_bodies.3'],
    };

    it('filter fid', () => {
      const feature = { id: 'tasmania_water_bodies.2' };
      expect(filterSelector(filter, feature)).to.be.true;
    });

    it('filter fid false', () => {
      const feature = { id: 'tasmania_water_bodies.0' };
      expect(filterSelector(filter, feature)).to.be.false;
    });
  });

  describe('Binary comparison', () => {
    it('propertyislessthan when true', () => {
      const feature = { properties: { AREA: 1065512598 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyislessthan',
        propertyname: 'AREA',
        literal: 1065512599,
      };
      expect(filterSelector(filter, feature)).to.be.true;
    });

    it('propertyislessthan when false', () => {
      const feature = { properties: { AREA: 1065512599 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyislessthan',
        propertyname: 'AREA',
        literal: 1065512599,
      };
      expect(filterSelector(filter, feature)).to.be.false;
    });

    it('propertyisequalto', () => {
      const feature = { properties: { PERIMETER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyisequalto',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, feature)).to.be.true;
    });

    it('propertyisequalto for non existent prop', () => {
      const feature = { properties: { PERIMETEEER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyisequalto',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, feature)).to.be.false;
    });

    it('propertyisnotequalto', () => {
      const featureeq = { properties: { PERIMETER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyisnotequalto',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, featureeq)).to.be.false;
      const featureuneq = { properties: { PERIMETER: 1071304900 } };
      expect(filterSelector(filter, featureuneq)).to.be.true;
    });

    it('propertyislessthanorequalto', () => {
      const feature = { properties: { PERIMETER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyislessthanorequalto',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, feature)).to.be.true;
      const featurels = { properties: { PERIMETER: 1071304932 } };
      expect(filterSelector(filter, featurels)).to.be.true;
      const featuregt = { properties: { PERIMETER: 1071304934 } };
      expect(filterSelector(filter, featuregt)).to.be.false;
    });

    it('propertyisgreaterthan', () => {
      const feature = { properties: { PERIMETER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyisgreaterthan',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, feature)).to.be.false;
    });

    it('propertyisgreaterthanorequalto', () => {
      const feature = { properties: { PERIMETER: 1071304933 } };
      const filter = {
        type: 'comparison',
        operator: 'propertyisgreaterthanorequalto',
        propertyname: 'PERIMETER',
        literal: 1071304933,
      };
      expect(filterSelector(filter, feature)).to.be.true;
    });
  });

  describe('Logical filters', () => {
    it('and filter', () => {
      const filter = {
        and: {
          propertyisequalto: [
            {
              propertyname: 'WATER_TYPE',
              literal: 'Lake',
            },
          ],
          propertyisgreaterthanorequalto: [
            {
              propertyname: 'area',
              literal: 1067509088,
            },
          ],
        },
      };
      const feature = { properties: { WATER_TYPE: 'Lake', area: 1067509088 } };
      expect(filterSelector(filter, feature)).to.be.true;
    });

    it('and filter with 2 child filters of same type', () => {
      const filter = {
        and: {
          propertyisequalto: [
            {
              propertyname: 'WATER_TYPE',
              literal: 'Lake',
            },
            {
              propertyname: 'area',
              literal: 1067509088,
            },
          ],
        },
      };
      const feature = { properties: { WATER_TYPE: 'Lake', area: 1067509088 } };
      expect(filterSelector(filter, feature)).to.be.true;
    });
  });
});

describe('scale selector', () => {
  it('return false when resultion is greater as rule maxscaledenominator', () => {
    const rule = {
      maxscaledenominator: 999,
    };
    expect(scaleSelector(rule, 1000 * 0.00028)).to.be.false;
  });
});

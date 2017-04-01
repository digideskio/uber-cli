'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiImmutable);
chai.use(sinonChai);

import { Map } from 'immutable';

import DistanceUnit from '../../../src/data/DistanceUnit';

import DistanceConverter from '../../../src/services/DistanceConverter';
import DurationConverter from '../../../src/services/DurationConverter';
import TripPriceEstimateRowFormatter from '../../../src/services/tables/TripPriceEstimateRowFormatter';

const expect = chai.expect;

describe('Trip Price Estimate Row Formatter', () => {
  const distanceConverter = new DistanceConverter();
  const durationConverter = new DurationConverter();
  const rowFormatter = new TripPriceEstimateRowFormatter(distanceConverter, durationConverter);

  it('construction', () => {
    let abbreviations = {};
    abbreviations[DistanceUnit.MILE.name] = 'mi';
    abbreviations[DistanceUnit.KILOMETER.name] = 'km';
    const expected = Map(abbreviations);
    expect(rowFormatter.distanceUnitAbbreviations).to.eql(expected);
  });

  describe('distance unit abbreviation', () => {
    it('gets abbreviation', () => {
      expect(rowFormatter.getDistanceUnitAbbreviation(DistanceUnit.MILE)).to.eql('mi');
    });

    it('throws exception', () => {
      expect(() => rowFormatter.getDistanceUnitAbbreviation('foo')).to.throw(TypeError);
    });
  });
});

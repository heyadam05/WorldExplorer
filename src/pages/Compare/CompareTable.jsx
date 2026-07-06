import { Link } from 'react-router-dom';
import './CompareTable.css';

export function CompareTable({ firstCountry, secondCountry }) {
  return (
    <section className="compare-page__table-container">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>{firstCountry?.name || 'Country 1'}</th>
            <th>{secondCountry?.name || 'Country 2'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Population</td>
            <td>{firstCountry?.population || 'N/A'}</td>
            <td>{secondCountry?.population || 'N/A'}</td>
          </tr>
          <tr>
            <td>Capital</td>
            <td>{firstCountry?.capital || 'N/A'}</td>
            <td>{secondCountry?.capital || 'N/A'}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{firstCountry?.area || 'N/A'} km²</td>
            <td>{secondCountry?.area || 'N/A'} km²</td>
          </tr>
          <tr>
            <td>Currency</td>
            <td>{firstCountry?.currencies?.join(', ') || 'N/A'}</td>
            <td>{secondCountry?.currencies?.join(', ') || 'N/A'}</td>
          </tr>
          <tr>
            <td>Region</td>
            <td>{firstCountry?.region || 'N/A'}</td>
            <td>{secondCountry?.region || 'N/A'}</td>
          </tr>
          <tr>
            <td>Subregion</td>
            <td>{firstCountry?.subregion || 'N/A'}</td>
            <td>{secondCountry?.subregion || 'N/A'}</td>
          </tr>
          <tr>
            <td>Languages</td>
            <td>{firstCountry?.languages?.join(', ') || 'N/A'}</td>
            <td>{secondCountry?.languages?.join(', ') || 'N/A'}</td>
          </tr>
          <tr>
            <td>Timezones</td>
            <td>{firstCountry?.timezones?.join(', ') || 'N/A'}</td>
            <td>{secondCountry?.timezones?.join(', ') || 'N/A'}</td>
          </tr>
          <tr>
            <td>Landlocked</td>
            <td>{firstCountry?.landlocked ? 'Yes' : 'No'}</td>
            <td>{secondCountry?.landlocked ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              {firstCountry?.borders?.length ? (
                firstCountry.borders.map((name, index) => (
                  <span className="country-link" key={name}>
                    <Link to={`/country/${name.toLowerCase()}`}>
                      {name}
                    </Link>
                    {index < firstCountry.borders.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                'N/A'
              )}
            </td>
            <td>
              {secondCountry?.borders?.length ? (
                secondCountry.borders.map((name, index) => (
                  <span className="country-link" key={name}>
                    <Link to={`/country/${name.toLowerCase()}`}>
                      {name}
                    </Link>
                    {index < secondCountry.borders.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                'N/A'
              )}
            </td>
          </tr>
          <tr>
            <td>Flag</td>
            <td>
              {firstCountry?.flag ? (
                <img width="30" height="20" src={firstCountry.flag} alt={`Flag of ${firstCountry.name}`} className="country-flag" />
              ) : (
                'N/A'
              )}
            </td>
            <td>
              {secondCountry?.flag ? (
                <img width="30" height="20" src={secondCountry.flag} alt={`Flag of ${secondCountry.name}`} className="country-flag" />
              ) : (
                'N/A'
              )}
            </td>
          </tr>

        </tbody>
      </table>
    </section>
  );
}

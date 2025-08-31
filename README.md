# Profiler
## Performance Profiling

Initial profiling was performed using **React DevTools Profiler**.

- **Tested interactions:**
    - Sorting a column
    - Searching for a country
    - Selecting a year
    - Adding/removing columns
<table>
    <thead>
        <tr>
            <th> Before optimisation </th>
            <th> After optimisation </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" align="center"><h3>Filter by country</h3></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Flame Graph whith duration info</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/country-flame.png" alt="">
            </td>
            <td>
                <img src="docs/after/country-flame.png" alt="">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Ranked Chart</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/after/country-ranked.png" alt="">
            </td>
            <td>
                <img src="docs/after/country-ranked.png" alt="">
            </td>
        </tr>
       <tr>
            <td colspan="2" align="center"><h3>Search by year</h3></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Flame Graph with duration info</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/year-flame.png" alt="">
            </td>
            <td>
                <img src="docs/after/year-flame.png" alt="">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Ranked Chart</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/year-ranked.png" alt="">
            </td>
            <td>
                <img src="docs/after/year-ranked.png" alt="">
            </td>
        </tr>       <tr>
            <td colspan="2" align="center"><h3>Sorting</h3></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Flame Graph whith duration info</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/sort-flame.png" alt="">
            </td>
            <td>
                <img src="docs/after/sort-flame.png" alt="">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Ranked Chart</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/sort-ranked.png" alt="">
            </td>
            <td>
                <img src="docs/after/sort-ranked.png" alt="">
            </td>
        </tr>       <tr>
            <td colspan="2" align="center"><h3>Selecting columns</h3></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Flame Graph whith duration info</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/columns-flame.png" alt="">
            </td>
            <td>
                <img src="docs/after/columns-flame.png" alt="">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center"><b>Ranked Chart</b></td>
        </tr>
        <tr>
            <td>
                <img src="docs/before/columns-ranked.png" alt="">
            </td>
            <td>
                <img src="docs/after/columns-ranked.png" alt="">
            </td>
        </tr>
    </tbody>
</table>

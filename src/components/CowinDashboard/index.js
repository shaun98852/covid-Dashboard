// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const switchCases = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    loading: switchCases.initial,
    sevenDaysVacc: [],
    vaccByAge: [],
    vaccByGener: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({loading: switchCases.loading})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')

    if (response.ok === true) {
      const details = await response.json()
      const last7DaysVaccination = details.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )

      this.setState({
        sevenDaysVacc: last7DaysVaccination,
        vaccByAge: details.vaccination_by_age,
        vaccByGener: details.vaccination_by_gender,
        loading: switchCases.success,
      })
    } else {
      this.setState({loading: switchCases.failure})
    }
  }

  successFunction = () => {
    const {sevenDaysVacc, vaccByAge, vaccByGener} = this.state

    return (
      <div className="graphBox">
        <VaccinationCoverage sevenDaysVacc={sevenDaysVacc} />
        <VaccinationByGender vaccByGener={vaccByGener} />
        <VaccinationByAge vaccByAge={vaccByAge} />
      </div>
    )
  }

  failureFunction = () => (
    <div className="loadingBackground">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failureImage"
        alt="failure view"
      />
      <h1 className="falureHeading">Something Went Wrong</h1>
    </div>
  )

  loadingFunction = () => (
    <div data-testid="loader" className="loaderBox">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  switchFunction = () => {
    const {loading} = this.state

    switch (loading) {
      case switchCases.success:
        return this.successFunction()
      case switchCases.failure:
        return this.failureFunction()
      case switchCases.loading:
        return this.loadingFunction()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <div className="secondContainer">
          <div className="logoBox">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="addLogo"
              alt="website logo"
            />
            <h1 className="cowin">Co-WIN</h1>
          </div>
          <h1 className="cowinHeading">CoWIN Vaccination in India</h1>
        </div>
        {this.switchFunction()}
      </div>
    )
  }
}

export default CowinDashboard

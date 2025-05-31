import { Card } from 'react-bootstrap'

const StatsCard = ({ title, value, icon, variant }) => {
  return (
    <Card bg={variant} text="white" className="mb-4">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0">{title}</h6>
          <h3 className="mb-0">{value}</h3>
        </div>
        <div className="icon-wrapper">
          {icon}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StatsCard
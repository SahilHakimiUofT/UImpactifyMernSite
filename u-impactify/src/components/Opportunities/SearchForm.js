import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function Searchform({ params, onParamChange}) {
    return (
        <Form className="mb-4">
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.description}
                    name="description" type="text"/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.location}
                    name="location" type="text"/>
                </Form.Group>

                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={onParamChange} value={params.full_time} 
                    name="full_time" id="full-time" label="Full Time" type="checkbox" className="mb-2"/>
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={onParamChange} value={params.part_time} 
                    name="part_time" id="part_time" label="Part Time" type="checkbox" className="mb-2"/>
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={onParamChange} value={params.volunteer} 
                    name="volunteer" id="volunteer" label="Volunteer" type="checkbox" className="mb-2" />

                 </Form.Group>
            </Form.Row>

        </Form>
    )
}
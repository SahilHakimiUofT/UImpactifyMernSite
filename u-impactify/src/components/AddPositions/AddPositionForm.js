import React, { useContext, useCallback } from "react";
import { AuthContext } from "../../Auth";

export function AddPositionForm(){
    const {currentUser} = useContext(AuthContext);
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const {title, org, location, type, description} = event.target.elements;

        console.log(title.value);
        console.log(org.value);
        console.log(location.value);
        console.log(type.value);
        console.log(description.value);
        console.log(currentUser.email);

        let databody = {
            "positionTitle": title.value,
            "organization": org.value,
            "employmentType": type.value,
            "description": description.value,
            "location": location.value,
            "orgemail": currentUser.email
        }

        console.log(databody);

        try{
            fetch('http://localhost:5000/positions/add', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            title.value = "";
            org.value = "";
            type.value = "Full Time";
            description.value = "";
            location.value = "";
            } catch (error)
            {
                alert(error);
            }
    });

    return(
        <div>
            <form onSubmit={handleSubmit}>
                            <label>
                                Position Title <br />
                                <input name="title" type="text" />
                            </label>
                            <br/>
                            <label>
                                Organization Name <br />
                                <input name="org" type="text" />
                            </label>
                            <br/>
                            <label>
                                Location <br />
                                <input name="location" type="text" />
                            </label>
                            <br/>
                            <label>
                                Position Type <br />
                                <select name="type">
                                <option value={'Full-Time'}>Full Time</option>
                                <option value={'Part-Time'}>Part Time</option>
                                <option value={'Volunteer'}>Volunteer</option>
                                <option value={'Internship'}>Internship</option>
                            </select>
                            </label>
                            <br/>
                            <label>
                                Position Description <br />
                            <textarea name="description"/>
                            </label>
                            <br />
                            <button type="submit" class='buttonAddPosition'>Add Position</button>
                            <br />
                            </form>
        </div>
    )
}
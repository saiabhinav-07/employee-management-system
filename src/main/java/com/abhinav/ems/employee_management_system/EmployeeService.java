package com.abhinav.ems.employee_management_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class EmployeeService {
	  @Autowired
	    private EmployeeRepository employeeRepository;

	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }

	    public Employee createEmployee(Employee employee) {
	        return employeeRepository.save(employee);
	    }

	    public Employee getEmployeeById(Long id) {
	        return employeeRepository.findById(id).orElse(null);
	    }

	    public void deleteEmployee(Long id) {
	        employeeRepository.deleteById(id);
	    }

}
